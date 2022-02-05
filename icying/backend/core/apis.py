from django.contrib.auth import get_user_model
from django.db.models import Q
from django.http import Http404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.views import APIView
from rest_framework.response import Response

from core.models import Restaurant
from core.serializers import RestaurantSerializer, RestaurantDetailSerializer, RestaurantListSerializer

from api.permissions import IsOwner, IsOwnerOrReadOnly

import requests
import os

User = get_user_model()


def get_lat_and_lng_from_google_maps_api(address):
    url = f"https://maps.googleapis.com/maps/api/place/findplacefromtext/json" \
          f"?input={address}" \
          f"&inputtype=textquery" \
          f"&fields=geometry" \
          f"&key={os.getenv('GOOGLE_MAPS_API_KEY')}"

    payload = {}
    headers = {}

    response = requests.request("GET", url, headers=headers, data=payload).json()
    geometry = response.get('candidates')[0].get('geometry').get('location')

    return geometry.get('lat'), geometry.get('lng')


def pagination(current_page, total_count):
    page_size = 5
    offset = 0 if current_page == 1 else (current_page - 1) * page_size
    total_page_count = int(total_count / page_size) + 1
    next_page_index = current_page + 1 if total_page_count > current_page else None
    return page_size, offset, total_page_count, next_page_index


class RestaurantApi(APIView):
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        lat = float(request.GET.get('latitude'))
        lng = float(request.GET.get('longitude'))
        page = int(request.GET.get('page'))

        condition = (
                Q(latitude__range=(lat - 0.01, lat + 0.01)) |
                Q(longitude__range=(lng - 0.015, lng + 0.015))
        )
        queryset = Restaurant.objects.filter(condition)
        page_size, offset, total_page_count, next_page_index = pagination(page, queryset.count())
        serializer = RestaurantListSerializer(queryset[offset:offset+page_size], many=True, context={"request": request})
        return Response({
            "totalPage": total_page_count,
            "currentPage": page,
            "nextUrl": f"/restaurant/?latitude={lat}&longitude={lng}&page={next_page_index}" if next_page_index is not None else None,
            "results": serializer.data
        })

    def post(self, request):
        request.data['user_id'] = request.user.id
        request.data['latitude'], request.data['longitude'] = \
            get_lat_and_lng_from_google_maps_api(request.data['address'])
        serializer = RestaurantSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "매장 등록 성공"
                }, status=status.HTTP_201_CREATED)
        return Response({
            "code": serializer.errors,
            "message": "매장 등록 실패"
        }, status=status.HTTP_400_BAD_REQUEST)


class RestaurantDetailApi(APIView):
    permission_classes = [IsOwnerOrReadOnly]

    def get_object(self, pk):
        try:
            obj = Restaurant.objects.get(pk=pk)
            self.check_object_permissions(self.request, obj)
            return obj
        except Restaurant.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        restaurant = self.get_object(pk)
        serializer = RestaurantDetailSerializer(restaurant)
        return Response({
            "message": "호출 성공",
            "response": serializer.data
        }, status=status.HTTP_200_OK)


class MyRestaurantApi(APIView):
    parser_classes = [JSONParser]
    permission_classes = [IsOwner]

    def get(self, request):
        try:
            queryset = Restaurant.objects.get(user_id_id=request.user.id)
            serializer = RestaurantSerializer(queryset)
            return Response({
                "message": "호출 성공",
                "response": serializer.data
            }, status=status.HTTP_200_OK)
        except Restaurant.DoesNotExist:
            return Response({
                "message": "등록한 매장이 없습니다"
            }, status=status.HTTP_400_BAD_REQUEST)
