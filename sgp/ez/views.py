from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.contrib.auth.models import User,auth
from django.contrib import messages
from .models import Profile,Business,Category,Item,BusinessPost
from django.contrib.auth.decorators import login_required

# Create your views here.
@login_required(login_url='login')
def index(request):
    
    user_object=User.objects.get(username=request.user.username)
    profile_object=Profile.objects.get(user=user_object)
    # business_list=profile_object.isBusiness
    print(profile_object.isBusiness)
    return render(request,'index.html',{'po':profile_object})

def signup(request):
    
    if request.method=="POST":
        username=request.POST['username']
        email=request.POST['email']
        password=request.POST['password']
        cpassword=request.POST['cpassword']
        
        if password==cpassword:
            if User.objects.filter(username=username).exists():
                messages.info(request,'Username Taken')
            else:
                user=User.objects.create_user(username=username,password=password,email=email)
                user.save()
                
                user_model=User.objects.get(username=username)
                new_profile=Profile.objects.create(user=user_model)
                new_profile.save()
                return redirect('login')
        else:
            messages.info(request,'Password not matching')
            return redirect('signup')
    else:
        return render(request,'signup.html')
    return render(request,'signup.html')


def login(request):
    
    if request.method=="POST":
        username=request.POST['username']
        password=request.POST['password']
        
        
        user=auth.authenticate(username=username,password=password)
        
        if user is not None:
            auth.login(request, user )
            return redirect('/')
        else:
            messages.info(request,'Credentiale invalid')
            return redirect('login')
        
    return render(request,'login.html')



@login_required(login_url='login')
def profile(request):
    
    
    user_object=User.objects.get(username=request.user.username)
    profile_object=Profile.objects.get(user=user_object)
       
    a=0
    if profile_object.isBusiness != None:
        a=1
        all_user_post=BusinessPost.objects.filter(user=user_object.username)
        
            
    if request.method=='POST':
        if request.POST['bio'] == '':
            bio=profile_object.bio
        else:
            bio=request.POST['bio']
            
        
        if request.FILES.get('img') == None:
            img=profile_object.profileimg
        else:
            img=request.FILES.get('img')
            print(img," Hello ")
            
        profile_object.profileimg=img
        profile_object.bio=bio
        profile_object.save()
        
    
    return render(request,'profile.html',{'po':profile_object,'a':a,'posts':all_user_post})


@login_required(login_url='login')
def logout(request):
    auth.logout(request)
    return redirect('login')


@login_required(login_url='login')
def add_Bus (request):
    
    
    if request.method=="POST":
        
        business_name=request.POST['business']
        contact=request.POST['contact']
        
        
        isActive=False
        
        business_object=Business.objects.create(businessName=business_name,contactNo=contact,isActive=isActive)
        business_object.save()
        user_object=User.objects.get(username=request.user.username)
        profile_object=Profile.objects.get(user=user_object)
        business_object.profile_set.add(profile_object)
        
        return redirect('/')
    
    
    businessList=None
    user_object=User.objects.get(username=request.user.username)
    profile_object=Profile.objects.get(user=user_object)
    a=0
    #print(profile_object.isBusiness.businessName)
    if profile_object.isBusiness != None:
        business_object=Business.objects.get(businessName=profile_object.isBusiness.businessName)
        businessList=business_object.categories.all()
        a=1
    
    
    # category_all_object=Category.objects.all()
    return render(request,'add_Bus.html',{'busList':businessList,'a':a})

@login_required(login_url='login')
def add_category(request):
    
    
    user_object=User.objects.get(username=request.user.username)
    profile_object=Profile.objects.get(user=user_object)
    business_object=Business.objects.get(businessName=profile_object.isBusiness.businessName)
    
    if request.method=="POST":
       
        if request.POST['categoryName'] != "" and request.POST['categoryType'] != "" :
            categoryName=request.POST['categoryName']
            categoryType=request.POST['categoryType']
            category_object=Category.objects.create(categoryName=categoryName,categoryType=categoryType)
            category_object.save()
            business_object.categories.add(category_object)

        categorys=request.POST.getlist('categorys')
        # print(categorys.id)        
        
        for category in categorys:
            cat=Category.objects.get(categoryName=category)
            business_object.categories.add(cat)

        return redirect('add_Bus')
    
    
    #items=Item.objects.all()
    
    category_all_object=Category.objects.all()
    category_in_business=business_object.categories.all()
    list=[]
    for category1 in category_all_object:
        if category1 not in category_in_business:
            list.append(category1)
    
    
    return render(request,'add_category.html',{'categorys':list})

@login_required(login_url='login') 
def add_item(request):
    
    if request.method=="POST": 
        itemName=request.POST['item_name']
        quantity=request.POST['quantity']
        price=request.POST['price']
        
        item_object=Item.objects.create(itemName=itemName,quantity=quantity,price=price)
        item_object.save()
        
        return redirect('add_category')
    return render(request,'add_item.html')


@login_required(login_url='login')
def list_category(request):
    pass

@login_required(login_url='login')
def search(request):
    
    if request.method=='POST':
        search=request.POST['search']
        user_objets=User.objects.filter(username__icontains=search)
        
        return render(request,'search.html',{'user_objs':user_objets})
    
    return redirect('/')


@login_required(login_url='login')
def uploadBPost(request):
    
    user_object=User.objects.get(username=request.user.username)
    params={
        'user':user_object
    }
    
    
    if request.method=='POST':
        img = request.FILES.get('postimg')
        print(img," erg ew")
        post_object=BusinessPost.objects.create(user=user_object.username,image=img)
        post_object.save()
        
    return redirect('/')