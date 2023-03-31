from django.urls import path
from . import views

urlpatterns=[
    path('',views.index,name='index'),
    path('signup/',views.signup,name='signup'),
    path('login/',views.login,name='login'),
    path('profile/',views.profile,name='profile'),
    path('add_Bus/',views.add_Bus,name="add_Bus"),
    path('add_category/',views.add_category,name="add_category"),
    path('add_item/',views.add_item,name="add_item"),
    path('list_category',views.list_category,name="list_category"),
    path('search',views.search,name='search'),
    path('logout/',views.logout,name='logout'),
    path('uploadBPost',views.uploadBPost,name="uploadBPost")
]