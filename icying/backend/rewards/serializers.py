from rest_framework import serializers

from core.serializers import RestaurantDetailSerializer
from rewards.models import Rewards, RewardCode, Donation


class RewardSerializer(serializers.ModelSerializer):
    is_exist = serializers.SerializerMethodField(read_only=True)
    created_at = serializers.SerializerMethodField(read_only=True)

    def get_is_exist(self, obj):
        user = self.context.get('request').user
        try:
            reward = Rewards.objects.get(user_id=user, code__code=obj.code)
            return True
        except Rewards.DoesNotExist:
            return False

    def get_created_at(self, obj):
        user = self.context.get('request').user
        try:
            reward = Rewards.objects.get(user_id=user, code__code=obj.code)
            return reward.created_at
        except Rewards.DoesNotExist:
            return None

    class Meta:
        model = RewardCode
        fields = [
            'code',
            'content',
            'number',
            'badge',
            'is_exist',
            'created_at'
        ]


class DonationSerializer(serializers.ModelSerializer):
    restaurant = RestaurantDetailSerializer(source='restaurant_id', read_only=True)

    class Meta:
        model = Donation
        fields = [
            'donation_id',
            'user_id',
            'restaurant_id',
            'restaurant',
            'ice_pack_number',
            'created_at',
        ]
