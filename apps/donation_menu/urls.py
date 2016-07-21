from django.conf.urls import url
import views

urlpatterns = [
	
	url(r'^$', views.Home.as_view()),
	url(r'^bikecheck/$', views.Bike.as_view(), name='check-in-bike'),
	url(r'^othercheck/$', views.Other.as_view(), name='check-in-other'),
	url(r'^findcheck/$', views.Find.as_view(), name='find-donation')

]