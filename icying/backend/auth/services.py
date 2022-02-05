import os
from datetime import datetime

import requests
from typing import Dict, Any

from django.contrib.auth import get_user_model
from django.http import HttpResponse
from django.core.exceptions import ValidationError
from django import VERSION

from rest_framework_jwt.settings import api_settings

from accounts.services import user_record_login

User = get_user_model()

GOOGLE_ID_TOKEN_INFO_URL = 'https://www.googleapis.com/oauth2/v3/tokeninfo'
GOOGLE_ACCESS_TOKEN_OBTAIN_URL = 'https://oauth2.googleapis.com/token'
GOOGLE_USER_INFO_URL = 'https://www.googleapis.com/oauth2/v3/userinfo'


def has_set_cookie_samesite():
    return (VERSION >= (2, 1, 0))


def set_cookie_with_token(response, name, token):
    params = {
        'expires': datetime.utcnow() + api_settings.JWT_EXPIRATION_DELTA,
        'domain': api_settings.JWT_AUTH_COOKIE_DOMAIN,
        'path': api_settings.JWT_AUTH_COOKIE_PATH,
        'secure': api_settings.JWT_AUTH_COOKIE_SECURE,
        'httponly': True
    }

    if has_set_cookie_samesite():
        params.update({'samesite': api_settings.JWT_AUTH_COOKIE_SAMESITE})

    response.set_cookie(name, token, **params)


def jwt_login(*, response: HttpResponse, user: User) -> HttpResponse:
    jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
    jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

    payload = jwt_payload_handler(user)
    token = jwt_encode_handler(payload)

    if api_settings.JWT_AUTH_COOKIE:
        set_cookie_with_token(response, api_settings.JWT_AUTH_COOKIE, token)

    user_record_login(user=user)

    return response


def google_validate_id_token(*, id_token: str) -> bool:
    response = requests.get(
        GOOGLE_ID_TOKEN_INFO_URL,
        params={'id_token': id_token}
    )

    if not response.ok:
        raise ValidationError('id_token is invalid.')

    audience = response.json()['aud']

    if audience != os.getenv("GOOGLE_OAUTH2_CLIENT_ID"):
        raise ValidationError('Invalid audience.')

    return True


def google_get_access_token(*, code: str, redirect_uri: str) -> str:
    # Reference: https://developers.google.com/identity/protocols/oauth2/web-server#obtainingaccesstokens
    data = {
        'code': code,
        'client_id': os.getenv("GOOGLE_OAUTH2_CLIENT_ID"),
        'client_secret': os.getnev("GOOGLE_OAUTH2_CLIENT_SECRET"),
        'redirect_uri': redirect_uri,
        'grant_type': 'authorization_code'
    }

    response = requests.post(GOOGLE_ACCESS_TOKEN_OBTAIN_URL, data=data)

    if not response.ok:
        raise ValidationError('Failed to obtain access token from Google.')

    access_token = response.json()['access_token']

    return access_token


def google_get_user_info(*, access_token: str) -> Dict[str, Any]:
    # Reference: https://developers.google.com/identity/protocols/oauth2/web-server#callinganapi
    response = requests.get(
        GOOGLE_USER_INFO_URL,
        params={'access_token': access_token}
    )

    if not response.ok:
        raise ValidationError('Failed to obtain user info from Google.')

    return response.json()
