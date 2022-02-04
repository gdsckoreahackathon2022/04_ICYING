from django.contrib.auth import get_user_model
from django.db import models

from core.models import Restaurant

User = get_user_model()


class RewardCode(models.Model):
    code = models.IntegerField(primary_key=True)
    content = models.CharField(
        verbose_name="내용",
        max_length=20
    )
    number = models.IntegerField(
        verbose_name="개수",
    )
    badge = models.CharField(max_length=300)

    class Meta:
        ordering = ['number']


class Rewards(models.Model):
    reward_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    code = models.ForeignKey(RewardCode, on_delete=models.CASCADE)
    created_at = models.DateField(auto_now_add=True)

    class Meta:
        ordering = ['code__number']


class Donation(models.Model):
    donation_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    restaurant_id = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
    ice_pack_number = models.IntegerField(default=1)
    created_at = models.DateField(auto_now_add=True)
