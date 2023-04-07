from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Profile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="user_profile"
    )
    bio = models.CharField(
        blank=True, default="Hey there, I am using EzyMarket !!!", max_length=100
    )
    isBusiness = models.ForeignKey(
        "Business", on_delete=models.CASCADE, null=True, blank=True
    )

    def __str__(self):
        return self.user.username


class Business(models.Model):
    businessName = models.CharField(max_length=25, unique=True)
    businessNameSlug = models.CharField(max_length=25, null=True, unique=True)
    isActive = models.BooleanField(default=False)
    contactNo = models.IntegerField()
    businessCategory = models.CharField(max_length=50, default="")
    # latitude = models.CharField(max_length=100, default=0, blank=True)
    # longitude = models.CharField(max_length=100, default=0, blank=True)
    # location = [latitude, longitude]
    categories = models.ManyToManyField("Category", blank=True)

    def __str__(self):
        return "%s - Owned By -" % (self.businessName)


class Category(models.Model):
    categoryName = models.CharField(max_length=25)
    categoryType = models.CharField(max_length=25)
    items = models.ManyToManyField("Item", blank=True)

    def __str__(self):
        return self.categoryName


class Item(models.Model):
    itemName = models.CharField(max_length=25)
    quantity = models.IntegerField(default=0)
    image = models.ImageField(
        upload_to="item_image", blank=True, default="blank-profile-picture.png"
    )
    price = models.IntegerField()

    def __str__(self):
        return self.itemName
