from django.contrib.auth import get_user_model
from haversine import haversine, Unit
from rest_framework import serializers

from core.models import Restaurant
User = get_user_model()


class RestaurantSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Restaurant
        fields = '__all__'


class RestaurantListSerializer(serializers.ModelSerializer):
    distance = serializers.SerializerMethodField(read_only=True)

    def get_distance(self, obj):
        request_params = self.context.get("request").GET
        current = (float(request_params.get('latitude')), float(request_params.get('longitude')))
        location = (obj.latitude, obj.longitude)
        distance = str(haversine(current, location)).split('.')
        return distance[0] + '.' + distance[1][:2] + 'km'

    class Meta:
        model = Restaurant
        ordering = ['distance']
        fields = [
            'restaurant_id',
            'name',
            'latitude',
            'longitude',
            'distance',
            'logo_image_url',
            'is_full'
        ]


class RestaurantDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = '__all__'
