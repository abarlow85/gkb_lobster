from django.forms import ModelForm
from django import forms
from .models import Bike
from .models import Component

class BikeForm(ModelForm):
	quantity = forms.IntegerField(min_value=1, max_value=20)
	class Meta:
		model = Bike
		fields = ["bikeType", "brand", "cosmetic", "frame", "features", "quantity"]

class componentForm(ModelForm):
	quantity = forms.IntegerField(min_value=1, max_value=20)
	class Meta:
		model = Component
		fields = ['category', 'item', 'price','quantity']

