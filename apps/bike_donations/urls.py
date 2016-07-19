from django.conf.urls import url
import views


urlpatterns = [

	url(r'^$', views.home),
	url(r'^form/$', views.form_data),
    url(r'^componentForm/$', views.component_data),
    url(r'^donateBikePost/$', views.donateBike_post),
    url(r'^componentPost/$', views.component_post),
    url(r'^print/$', views.print_label),
	url(r'^logout/$', views.loggingout)
]
