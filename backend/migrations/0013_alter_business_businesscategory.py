# Generated by Django 4.1.7 on 2023-03-31 13:46

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("backend", "0012_business_businesscategory"),
    ]

    operations = [
        migrations.AlterField(
            model_name="business",
            name="businessCategory",
            field=models.CharField(default="", max_length=50),
        ),
    ]
