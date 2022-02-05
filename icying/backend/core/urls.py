from django.urls import path, include
from core.apis import *


restaurant_patterns = [
    path('', RestaurantApi.as_view()),
    path('<int:pk>/', RestaurantDetailApi.as_view()),
]

urlpatterns = [
    path('restaurant/', include(restaurant_patterns)),
    path('my-restaurant/', MyRestaurantApi.as_view())
]
