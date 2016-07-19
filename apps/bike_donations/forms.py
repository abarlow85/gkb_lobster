from django.forms import ModelForm
from .models import Bike
from .models import Component

class BikeForm(ModelForm):
    class Meta:
        model = Bike
        fields = ["bikeType", "brand", "cosmetic", "frame", "features"]

class componentForm(ModelForm):
	class Meta:
		model = Component
		fields = ['category', 'item', 'price']

