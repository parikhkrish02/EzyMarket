from django.urls import path
from . import views
from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("api/", views.getRoutes, name="getRoutes"),
    path("api/signUp/", views.signUp, name="signUp"),
    path("api/deleteUser/", views.deleteUser, name="deleteUser"),
    path("api/token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    # custom
    path("api/profile/<str:username>/", views.userProfile, name="userProfile"),
    path("api/businesses-near-me/", views.allBusiness, name="allBusiness"),
    path("api/business/updateItem/<str:itemId>/", views.updateQuantity, name="updateQuantity"),
    path("api/business/<str:businessNameSlug>/", views.buisnessView, name="buisnessView"),
    path("api/business/<str:businessNameSlug>/", views.buisnessView, name="buisnessView"),
    path("api/business/<str:businessNameSlug>/toggleActive/", views.toggleActive, name="buisnessView"),
]
