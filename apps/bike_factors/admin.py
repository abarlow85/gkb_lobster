from django.contrib import admin
from .models import *

# Register your models here.


class FeaturesOptionAdmin(admin.ModelAdmin):
	filter_horizontal = ['requisites']

class BrandOptionAdmin(admin.ModelAdmin):
	filter_horizontal = ['requisites']

class CosmeticOptionAdmin(admin.ModelAdmin):
	filter_horizontal = ['requisites']

class FrameOptionAdmin(admin.ModelAdmin):
	filter_horizontal = ['requisites']

admin.site.register(BikeOption)
admin.site.register(FeaturesOption, FeaturesOptionAdmin)
admin.site.register(BrandOption, BrandOptionAdmin)
admin.site.register(CosmeticOption, CosmeticOptionAdmin)
admin.site.register(FrameOption, FrameOptionAdmin)