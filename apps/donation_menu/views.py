from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.views.generic import View
from django.contrib.auth.mixins import LoginRequiredMixin


# Create your views here.

class Home(LoginRequiredMixin, View):
	login_url = '/login'

	def get(self,request):
		if 'selection' in request.session:
			del request.session['selection']
		if 'selectionTitle' in request.session:
			del request.session['selectionTitle']
		return render(request, 'donation_menu/index.html')

class Bike(LoginRequiredMixin, View):
	login_url = '/login'

	def get(self,request):
		request.session['selection'] = 'bikeOptionsController'
		request.session['selectionTitle'] = 'Add a bike'
		return HttpResponseRedirect('/')

class Other(LoginRequiredMixin, View):
	login_url = '/login'

	def get(self,request):
		request.session['selection'] = 'componentOptionsController'
		request.session['selectionTitle'] = 'Add component or other'
		return HttpResponseRedirect('/')

class Find(LoginRequiredMixin, View):
	login_url = '/login'

	def get(self,request):
		return HttpResponseRedirect('/find')
