# user-defined models
from django.contrib.auth.models import User
from .models import Business, Profile, Item, Category

# model serializers
from .serializers import (
    UserSerializer,
    UserProfileSerializer,
    BusinessSerializer,
    CategorySerializer,
    ItemSerializer,
)

# api set-up
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.hashers import make_password


# jwt token generation
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token["username"] = user.username

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(["GET"])
def getRoutes(request):
    routes = [
        {
            "Endpoint": "/api/token/",
            "method": "POST",
            "body": None,
            "description": "response with auth token",
        },
        {
            "Endpoint": "/api/signUp/",
            "method": "POST",
            "body": None,
            "description": "set up a new user",
        },
    ]
    return Response(routes)


@api_view(["POST"])
def signUp(request):
    if request.method == "POST":
        data = request.data

        if User.objects.filter(email=data["email"]):
            return Response("Email already Exists !!", status=400)

        elif User.objects.filter(username=data["username"]):
            return Response("Username Taken !!", status=400)

        elif data["username"] == "" or data["email"] == "":
            return Response("Credentials can't be Empty")

        else:
            print(data["password"])
            User.objects.create(
                email=data["email"],
                username=data["username"],
                password=make_password(data["password"]),
            ).save()

    return Response("User Signed In")


@api_view(["DELETE"])
def deleteUser(request):
    if request.method == "DELETE":
        data = request.data

        user = User.objects.get(email=data["email"])
        user.delete()

    return Response("User deleted")


@api_view(["GET"])
def userProfile(request, username):
    if request.method == "GET":
        if User.objects.filter(username=username).exists():
            profile = Profile.objects.get(user=User.objects.get(username=username))
            serialized_profile = UserProfileSerializer(profile, many=False).data

            return Response(serialized_profile)

        else:
            return Response("User does't Exists !!", status=400)


@api_view(["GET"])
def allBusiness(request):
    if request.method == "GET":
        business_near_by = Profile.objects.all().exclude(isBusiness=None)
        serialized_business_near_by = UserProfileSerializer(business_near_by, many=True).data

        return Response(serialized_business_near_by)


@api_view(["GET"])
def buisnessView(request, businessNameSlug):
    if request.method == "GET":
        if Business.objects.filter(businessNameSlug=businessNameSlug).exists():
            business = Business.objects.get(businessNameSlug=businessNameSlug)
            owner = Profile.objects.get(isBusiness=business)
            serialized_business_owner = UserProfileSerializer(owner).data

            return Response(serialized_business_owner)

        else:
            return Response("No such Business Exists !!", status=400)
