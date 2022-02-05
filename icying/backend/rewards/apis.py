from django.contrib.auth import get_user_model
from django.db.models import Sum
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

from core.models import Restaurant
from rewards.models import Donation, Rewards, RewardCode

from rewards.serializers import DonationSerializer, RewardSerializer

User = get_user_model()


def update_restaurant_list_up_status(restaurant_id, is_restaurant_ice_full):
    try:
        restaurant = Restaurant.objects.get(restaurant_id=restaurant_id)
        restaurant.is_full = is_restaurant_ice_full
        restaurant.save()
    except Restaurant.DoesNotExist:
        pass


def check_donation_number_and_get_rewards(user_id):
    total_ice_donation_count = Donation.objects.filter(user_id_id=user_id)\
        .aggregate(Sum('ice_pack_number'))\
        .get('ice_pack_number__sum')
    print(total_ice_donation_count)
    try:
        rewards = Rewards.objects.get(user_id_id=user_id, code__code=1000)
        pass
    except Rewards.DoesNotExist:
        if total_ice_donation_count >= 1000:
            Rewards.objects.create(
                user_id_id=user_id,
                code_id=1000
            )
    try:
        rewards = Rewards.objects.get(user_id_id=user_id, code__code=500)
        pass
    except Rewards.DoesNotExist:
        if total_ice_donation_count >= 500:
            Rewards.objects.create(
                user_id_id=user_id,
                code_id=500
            )

    try:
        rewards = Rewards.objects.get(user_id_id=user_id, code__code=100)
        pass
    except Rewards.DoesNotExist:
        if total_ice_donation_count >= 100:
            Rewards.objects.create(
                user_id_id=user_id,
                code_id=100
            )

    try:
        rewards = Rewards.objects.get(user_id_id=user_id, code__code=50)
        pass
    except Rewards.DoesNotExist:
        if total_ice_donation_count >= 50:
            Rewards.objects.create(
                user_id_id=user_id,
                code_id=50
            )

    try:
        rewards = Rewards.objects.get(user_id_id=user_id, code__code=10)
        pass
    except Rewards.DoesNotExist:
        if total_ice_donation_count >= 10:
            Rewards.objects.create(
                user_id_id=user_id,
                code_id=10
            )

    try:
        rewards = Rewards.objects.get(user_id_id=user_id, code__code=1)
        pass
    except Rewards.DoesNotExist:
        if total_ice_donation_count >= 1:
            Rewards.objects.create(
                user_id_id=user_id,
                code_id=1
            )


class CreateDonationApi(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        is_restaurant_ice_full = request.data.get('is_full')
        del request.data['is_full']
        serializer = DonationSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({
                "message": serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        update_restaurant_list_up_status(request.data.get('restaurant_id'), is_restaurant_ice_full)
        check_donation_number_and_get_rewards(request.data.get('user_id'))
        return Response({
            "message": "아이스팩 받음 등록 성공"
        }, status=status.HTTP_201_CREATED)


class DonationListApi(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        display = int(request.GET.get('display'))
        query = request.GET.get('query')

        if query == "biggest":
            query_field = '-ice_pack_number'
        elif query == "latest":
            query_field = '-created_at'
        else:
            query_field = 'created_at'

        queryset = Donation.objects.filter(user_id_id=request.user.id).order_by(query_field)[:display]
        serializer = DonationSerializer(queryset, many=True)
        return Response({
            "message": "호출 성공",
            "response": {
                "records": serializer.data
            }
        }, status=status.HTTP_200_OK)


class RewardsListApi(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        queryset = RewardCode.objects.all().order_by('number')
        serializer = RewardSerializer(queryset, many=True, context={"request": request})
        return Response({
            "message": "호출 성공",
            "response": {
                "rewards": serializer.data
            }
        }, status=status.HTTP_200_OK)

