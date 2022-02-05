from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('rewards', '0001_initial'),
    ]

    operations = [
        migrations.RunSQL(
            """
            INSERT INTO rewards_rewardcode
                (code, content, number, badge) VALUES
                (1, '아기 아이셔', 1, 'https://drive.google.com/file/d/11-kfVzgd_ZNF7uRv18ittyw1TR_tcJCk/view?usp=sharing'),
                (10, '아이싱어', 10, 'https://drive.google.com/file/d/1jGp7YHYzkxodSrKVWS0u4nI8q8fyA7st/view?usp=sharing'),
                (50, '아이셔 마스터', 50, 'https://drive.google.com/file/d/153hyTa7jEhKRXu370gwmN9F5JaaHdP5X/view?usp=sharing'),
                (100, '환경등대 아이셔', 100, 'https://drive.google.com/file/d/10y5UiwJsMqRzOtaUqLA-_EIsM8uYt4Lh/view?usp=sharing'),
                (500, '아이셔 전하', 500, 'https://drive.google.com/file/d/10y5UiwJsMqRzOtaUqLA-_EIsM8uYt4Lh/view?usp=sharing'),
                (1000, '지구 수호천사 아이셔', 1000, 'https://drive.google.com/file/d/1ysodk788I3Iyrbmv-7kaFcOpNI0d0LIf/view?usp=sharing');
            """
        )
    ]
