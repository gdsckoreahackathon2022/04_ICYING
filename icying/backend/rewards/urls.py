from django.urls import path, include
from rewards.apis import *


urlpatterns = [
    # path('restaurant/', include(restaurant_patterns)),
    path('icepack/', CreateDonationApi.as_view()),
    path('record/', DonationListApi.as_view()),
    path('medal/', RewardsListApi.as_view()),
]
