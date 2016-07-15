from __future__ import unicode_literals

from django.db import models

class HandlebarOption(models.Model):
	option = models.CharField(max_length=150)
	price = models.DecimalField(max_digits=5, decimal_places=2)


	def __str__(self):
		return self.option

	class Meta:
		ordering = ['option']

class SaddleOption(models.Model):
	option = models.CharField(max_length=150)
	price = models.DecimalField(max_digits=5, decimal_places=2)


	def __str__(self):
		return self.option

	class Meta:
		ordering = ['option']



