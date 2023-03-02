from rest_framework.serializers import ModelSerializer
from .models import Profile, User, Business, Item, Category


class ItemSerializer(ModelSerializer):
    class Meta:
        model = Item
        fields = "__all__"


class CategorySerializer(ModelSerializer):
    items = ItemSerializer(many=True)

    class Meta:
        model = Category
        fields = "__all__"


class BusinessSerializer(ModelSerializer):
    categories = CategorySerializer(many=True)

    class Meta:
        model = Business
        fields = "__all__"


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email", "date_joined", "last_login"]
        read_only_fields = ["username", "email", "date_joined", "last_login"]


class UserProfileSerializer(ModelSerializer):
    user = UserSerializer(many=False)
    isBusiness = BusinessSerializer(many=False)

    class Meta:
        model = Profile
        fields = "__all__"
