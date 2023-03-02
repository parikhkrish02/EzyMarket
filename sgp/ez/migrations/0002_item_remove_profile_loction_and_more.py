# Generated by Django 4.1.2 on 2023-03-02 07:51

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('ez', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('itemName', models.CharField(max_length=25)),
                ('quantity', models.IntegerField(default=0)),
                ('price', models.IntegerField()),
            ],
        ),
        migrations.RemoveField(
            model_name='profile',
            name='loction',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='profileimg',
        ),
        migrations.AlterField(
            model_name='profile',
            name='bio',
            field=models.CharField(blank=True, default='Hey there, I am using EzyMarket !!!', max_length=100),
        ),
        migrations.AlterField(
            model_name='profile',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='user_profile', to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('categoryName', models.CharField(max_length=25)),
                ('categoryType', models.CharField(max_length=25)),
                ('items', models.ManyToManyField(to='ez.item')),
            ],
        ),
        migrations.CreateModel(
            name='Business',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('businessName', models.CharField(max_length=25)),
                ('isActive', models.BooleanField(default=False)),
                ('contactNo', models.IntegerField()),
                ('categories', models.ManyToManyField(to='ez.category')),
            ],
        ),
        migrations.AddField(
            model_name='profile',
            name='isBusiness',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='ez.business'),
        ),
    ]
