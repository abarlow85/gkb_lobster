from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.views.generic import View
from .forms import CustomSkuForm
from ..bike_donations.api import LightspeedApi
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth import logout


# Create your views here.

class Home(LoginRequiredMixin, View):
	login_url = '/login'
	form = CustomSkuForm()

	def get(self, request):
		return render(request, 'get_inventory/index.html', {'form' : self.form})

class Search(LoginRequiredMixin, View):
	login_url = '/login'
	def get(self, request, sku):
		print sku
		form = CustomSkuForm({'customSku': sku})

		if form.is_valid():
			api = LightspeedApi()
			item = api.get_item(form.cleaned_data['customSku'])
			if item['status'] == 200:
				return JsonResponse({'status': True, 'item': item['content']}, safe=False)
			else:
				return JsonResponse({'status': False, 'error': item['status']})

		else:
			return render(request, 'get_inventory/index.html', {'form':form})

@login_required(login_url = '/login')
def delete_item(request):

	api = LightspeedApi()
	confirm = api.delete_item(request.body)
	return JsonResponse({'status':True})
