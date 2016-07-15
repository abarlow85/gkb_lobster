from __future__ import unicode_literals

from django.db import models

# Create your models here.

class BikeOption(models.Model):
	option = models.CharField(max_length=150)
	price_factor = models.DecimalField(max_digits=3, decimal_places=2)


	def __str__(self):
		return self.option

	class Meta:
		ordering = ['option']

class BrandOption(models.Model):
	option = models.CharField(max_length=150)
	price_factor = models.DecimalField(max_digits=3, decimal_places=2)
	requisites = models.ManyToManyField(BikeOption, verbose_name="Bike types that this feature is avalable for")

	def __str__(self):
		return self.option

	class Meta:
		ordering = ['option']

class CosmeticOption(models.Model):
	option = models.CharField(max_length=150)
	price_factor = models.DecimalField(max_digits=3, decimal_places=2)
	requisites = models.ManyToManyField(BikeOption, verbose_name="Bike types that this feature is avalable for")

	def __str__(self):
		return self.option

	class Meta:
		ordering = ['-price_factor']

class FrameOption(models.Model):
	option = models.CharField(max_length=150)
	price_factor = models.DecimalField(max_digits=3, decimal_places=2)
	requisites = models.ManyToManyField(BikeOption, verbose_name="Bike types that this feature is avalable for")

	def __str__(self):
		return self.option

	class Meta:
		ordering = ['option']

class FeaturesOption(models.Model):
	option = models.CharField(max_length=150)
	price_factor = models.DecimalField(max_digits=3, decimal_places=2)
	requisites = models.ManyToManyField(BikeOption, verbose_name="Bike types that this feature is avalable for")

	def __str__(self):
		return self.option

	class Meta:
		ordering = ['option']
		
		 

