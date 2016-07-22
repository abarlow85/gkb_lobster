from django.conf.urls import url
import views


urlpatterns = [
	
	url(r'^$', views.Home.as_view()),
	url(r'^items/(?P<sku>\d+)/$', views.Search.as_view(), name="find-item"),
	url(r'^items/delete$', views.delete_item),

]