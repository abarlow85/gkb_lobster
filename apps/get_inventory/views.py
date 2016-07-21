from django.shortcuts import render
from django.http import JsonResponse
from django.views.generic import View
from .forms import CustomSkuForm
from ..bike_donations.api import LightspeedApi
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth import logout


# Create your views here.

class Home(LoginRequiredMixin, View):
	
	def get(self, request):
		if request.user.is_superuser:
			logout(request)
			return HttpResponseRedirect('/login')
		return render(request, 'get_inventory/index.html')

class Search(LoginRequiredMixin, View):
	
	def get(self, request, sku):
		if request.user.is_superuser:
			logout(request)
			return HttpResponseRedirect('/login')

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

@login_required()
def delete_item(request):
	if request.user.is_superuser:
		logout(request)
		return HttpResponseRedirect('/login')
		
	api = LightspeedApi()
	confirm = api.delete_item(request.body)
	if confirm['status'] == 200:
		return JsonResponse({'status':True})
	else:
		return JsonResponse({'status':False, 'error': confirm['error']})
