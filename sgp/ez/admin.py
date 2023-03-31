from django.contrib import admin
from .models import Profile,Business,Category,Item,BusinessPost
# Register your models here.

admin.site.register(Profile)
admin.site.register(Business)
admin.site.register(Category)
admin.site.register(Item)

admin.site.register(BusinessPost)
