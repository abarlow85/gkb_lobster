from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.http import HttpResponseRedirect

# Create your views here.
def home(request):
    return render(request, 'login/index.html')

def verifyUser(request):
    if request.method == "POST":
        user = authenticate(username = request.POST["userType"], password = request.POST["password"])
        if user is not None:
            if user.is_active:
                print("user is valid", user)
                login(request, user)
                return HttpResponseRedirect('/menu')
            else:
                print("password is valid but disabled")
                return render(request, 'login/index.html', {"error":"Account disabled"})

        else:
            print("doesn't exist")
            return render(request, 'login/index.html', {"error":"Invalid password for " + request.POST["userType"]})
