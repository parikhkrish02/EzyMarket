from django.contrib import admin
from .models import User, Profile, Business, Category, Item

# Register your models here.

admin.site.register(Profile)
admin.site.register(Business)
admin.site.register(Category)
admin.site.register(Item)
