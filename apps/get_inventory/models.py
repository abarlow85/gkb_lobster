from __future__ import unicode_literals

from django.db import models

# Create your models here.

class CustomSku(models.Model):
	customSku = models.CharField(max_length=11)