from urllib.parse import urlencode

from django.contrib.auth import get_user_model
from rest_framework import status, serializers
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_jwt.views import ObtainJSONWebToken

from django.urls import reverse
from django.conf import settings
from django.shortcuts import redirect

from accounts.serializers import UserSerializer
from api.mixins import ApiErrorsMixin, PublicApiMixin, ApiAuthMixin

from accounts.services import user_record_login, user_change_secret_key, user_get_or_create
from auth.services import jwt_login, google_get_access_token, google_get_user_info

User = get_user_model()


def is_email_already_exists(email) -> bool:
    try:
        if User.objects.get(email=email):
            return True
        return False
    except:
        return False


def confirm_password(user_data: dict) -> bool:
    if user_data['password'] == user_data['repeat_pwd']:
        return True
    return False


def clean_user_data(data: dict) -> dict:
    del data['repeat_pwd']
    data['social_login'] = None
    return data


class SignupApi(PublicApiMixin, APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        data = request.data
        if is_email_already_exists(data['email']):
            return Response({
                "code": "U002",
                "message": "이미 존재하는 아이디입니다"
            }, status=status.HTTP_400_BAD_REQUEST)
        if not confirm_password(data):
            return Response({
                "code": "U001",
                "message": "비밀번호가 일치하지 않습니다"
            }, status=status.HTTP_400_BAD_REQUEST)

        data = clean_user_data(data)
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "signup success"
            }, status=status.HTTP_201_CREATED)
        return Response({
            "message": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class LoginApi(ApiErrorsMixin, ObtainJSONWebToken):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.object.get('user') or request.user
        user_record_login(user=user)

        user_sz = UserSerializer(user)

        res = super().post(request, *args, **kwargs)
        if res.status_code == 200:
            return Response({
                "access_token": res.data.get('token'),
                "user": user_sz.data
            }, status=status.HTTP_201_CREATED)


class GoogleLoginApi(PublicApiMixin, ApiErrorsMixin, APIView):
    class InputSerializer(serializers.Serializer):
        code = serializers.CharField(required=False)
        error = serializers.CharField(required=False)

    def get(self, request, *args, **kwargs):
        input_serializer = self.InputSerializer(data=request.GET)
        input_serializer.is_valid(raise_exception=True)

        validated_data = input_serializer.validated_data

        code = validated_data.get('code')
        error = validated_data.get('error')

        login_url = f'{settings.BASE_FRONTEND_URL}/login'

        if error or not code:
            params = urlencode({'error': error})
            return redirect(f'{login_url}?{params}')

        domain = settings.BASE_BACKEND_URL
        api_uri = reverse('api:v1:auth:login-with-google')
        redirect_uri = f'{domain}{api_uri}'

        access_token = google_get_access_token(code=code, redirect_uri=redirect_uri)

        user_data = google_get_user_info(access_token=access_token)

        profile_data = {
            'email': user_data['email'],
            'social_login': 'g'
        }

        # We use get-or-create logic here for the sake of the example.
        # We don't have a sign-up flow.
        user, _ = user_get_or_create(**profile_data)

        response = redirect(settings.BASE_FRONTEND_URL)
        response = jwt_login(response=response, user=user)

        return response


class LogoutApi(ApiAuthMixin, ApiErrorsMixin, APIView):
    def post(self, request):
        """
        Logs out user by removing JWT cookie header.
        """
        user_change_secret_key(user=request.user)

        response = Response(status=status.HTTP_202_ACCEPTED)
        response.delete_cookie(settings.JWT_AUTH['JWT_AUTH_COOKIE'])

        return response
