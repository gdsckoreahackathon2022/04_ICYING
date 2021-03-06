# Generated by Django 3.1.7 on 2022-02-04 13:19

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import utils.image


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Restaurant',
            fields=[
                ('restaurant_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=30)),
                ('address', models.CharField(max_length=50)),
                ('latitude', models.DecimalField(decimal_places=7, max_digits=10)),
                ('longitude', models.DecimalField(decimal_places=7, max_digits=10)),
                ('ice_need_number', models.CharField(default='free', max_length=10000, verbose_name='필요한 아이스팩 개수')),
                ('logo_image_url', models.ImageField(upload_to=utils.image.user_directory_path)),
                ('descript', models.TextField(null=True)),
                ('is_full', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
    ]
