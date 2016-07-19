from django.conf.urls import url
import views

urlpatterns = [
    url(r'^$', views.home),
    url(r'^auth/$', views.verifyUser, name="auth")
]
