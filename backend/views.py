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
            "body": "refresh token",
            "description": "response with auth token",
        },
        {
            "Endpoint": "/api/signUp/",
            "method": "POST",
            "body": None,
            "description": "set up a new user",
        },
        {
            "Endpoint": "/api/businesses-near-me/",
            "method": "GET",
            "body": None,
            "description": "return all business",
        },
        {
            "Endpoint": "/api//",
            "method": "GET",
            "body": None,
            "description": "set up a new business",
        },
        {
            "Endpoint": "/api/api/business/<str:businessNameSlug>/",
            "method": "GET",
            "body": None,
            "description": "response with a single business data",
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
        serialized_business_near_by = UserProfileSerializer(
            business_near_by, many=True
        ).data

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


@api_view(["GET"])
def toggleActive(request, businessNameSlug):
    if request.method == "GET":
        if Business.objects.filter(businessNameSlug=businessNameSlug).exists():
            business = Business.objects.get(businessNameSlug=businessNameSlug)
            business.isActive = not (business.isActive)
            business.save()

            return Response("Toggled Business")

        else:
            return Response("No such Business Exists !!", status=400)


@api_view(["POST"])
def updateQuantity(request, itemId):
    if request.method == "POST":
        data = request.data
        reqType = data["type"]

        if Item.objects.filter(id=itemId).exists():
            if reqType == "incr":
                item = Item.objects.get(id=itemId)
                item.quantity = item.quantity + 1
                item.save()

                return Response("Item Incremented")

            elif reqType == "decr":
                item = Item.objects.get(id=itemId)
                item.quantity = item.quantity - 1
                item.save()

                return Response("Item Decremented")

            elif reqType == "change":
                item = Item.objects.get(id=itemId)
                if not (data.quantity == 0):
                    item.quantity = data["quantity"]
                item.save()

            else:
                return Response("No such type exists")

        else:
            return Response("No such Item Exists !!", status=400)


@api_view(["POST"])
def add_item(request):
    if request.method == "POST":
        data = request.data

        if Business.objects.filter(businessNameSlug=data["businessNameSlug"]).exists():
            business = Business.objects.get(businessNameSlug=data["businessNameSlug"])
            item = Item.objects.create(itemName=data["item"], price=data["price"])
            item.save()
            category = business.categories.all().get(categoryName=data["category"])
            cat = Category.objects.get(id=category.id)
            cat.items.add(item)

            return Response("Item Added", status=200)
        else:
            return Response("No such Business Exists", status=400)

    else:
        return Response("Error")


@api_view(["POST"])
def add_business(request):
    if request.method == "POST":
        data = request.data

        business = Business.objects.create(
            businessName=data["businessName"],
            businessNameSlug=data["businessNameSlug"],
            contactNo=data["contactNo"],
            businessCategory=data["businessCategory"],
        )
        business.save()

        return Response("done")


@api_view(["POST"])
def add_item(request):
    if request.method == "POST":
        data = request.data

        if Business.objects.filter(businessNameSlug=data["businessNameSlug"]).exists():
            business = Business.objects.get(businessNameSlug=data["businessNameSlug"])
            item = Item.objects.create(
                itemName=data["item"], price=data["price"], quantity=data["quantity"]
            )
            item.save()
            category = business.categories.all().get(categoryName=data["category"])
            cat = Category.objects.get(id=category.id)
            cat.items.add(item)

            return Response("Item Added", status=200)
        else:
            return Response("No such Business Exists", status=400)

    else:
        return Response("Error")


@api_view(["POST"])
def add_category(request):
    if request.method == "POST":
        data = request.data

        if Business.objects.filter(businessNameSlug=data["businessNameSlug"]).exists():
            business = Business.objects.get(businessNameSlug=data["businessNameSlug"])
            cat = Category.objects.create(
                categoryName=data["categoryName"], categoryType=data["categoryType"]
            )
            cat.save()
            business.categories.add(cat)

            return Response("Category Added", status=200)
        else:
            return Response("No such Business Exists", status=400)

    else:
        return Response("Error")
