from django.urls import path, include

from auth.apis import LoginApi, GoogleLoginApi, LogoutApi, SignupApi

login_patterns = [
    path('', LoginApi.as_view(), name='login'),
    path('google/', GoogleLoginApi.as_view(), name='login-with-google'),
]

urlpatterns = [
    path('signup/', SignupApi.as_view(), name='signup'),
    path('login/', include(login_patterns)),
    path('logout/', LogoutApi.as_view(), name='logout'),
]
