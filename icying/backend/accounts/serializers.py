from rest_framework import serializers
from accounts.models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(required=True, write_only=True)

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            social_login=validated_data['social_login']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'social_login', 'date_joined']
