from django.contrib.auth import get_user_model
from django.db import models

from utils import image
User = get_user_model()


class Restaurant(models.Model):
    restaurant_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    name = models.CharField(max_length=30, null=False)
    address = models.CharField(max_length=50, null=False)
    latitude = models.DecimalField(
        decimal_places=7,
        max_digits=10,
        null=False
    )
    longitude = models.DecimalField(
        decimal_places=7,
        max_digits=10,
        null=False
    )
    ice_need_number = models.CharField(
        verbose_name="필요한 아이스팩 개수",
        max_length=10000,
        default="free"
    )
    logo_image_url = models.ImageField(upload_to=image.user_directory_path)
    descript = models.TextField(null=True)
    is_full = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
