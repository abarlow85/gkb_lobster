from django.shortcuts import render
from django.http import JsonResponse, HttpResponseRedirect
from .models import Bike, Component
from ..component_factors.models import HandlebarOption, SaddleOption
from ..bike_factors.models import BikeOption, BrandOption, CosmeticOption, FeaturesOption, FrameOption
import requests
import json
import string
import random
from .api import LightspeedApi
from .forms import BikeForm, componentForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
# from django.views.generic.base import TemplateView



# Create your views here.
@login_required(login_url = '/login')
def home(request):
	return render(request, 'bike_donations/index.html')

@login_required(login_url = '/login')
def form_data(request):
	context = {
		'bikeType' : serialize_selections(BikeOption.objects.all()),
		'brand' : serialize_selections(BrandOption.objects.all()),
		'cosmetic' : serialize_selections(CosmeticOption.objects.all()),
		'frame' : serialize_selections(FrameOption.objects.all()),
		'features' : serialize_selections(FeaturesOption.objects.all())
	}
	print FeaturesOption.objects.all()
	return JsonResponse(context)


def serialize_selections(query_set):
	data = {}

	for obj in query_set:
		if type(obj) == BikeOption:
			data[obj.option] = {'status' : False, 'price_factor' : obj.price_factor}
		else:
			requisites = []
			for req in obj.requisites.values():
				requisites.append(req['option'])


			data[obj.option] = {'status' : False, 'price_factor' : obj.price_factor, 'requisites':requisites}

	return data

@login_required(login_url = '/login')
def donateBike_post(request):
	print("user", request.user.username)
	username = request.user.username
	parsed_json = json.loads(request.body)
	optionsArray = []

	bikeoption = BikeOption.objects.get(option=parsed_json["bikeType"])
	optionsArray.append(bikeoption)

	if 'brand' in parsed_json:
		brandoption = BrandOption.objects.get(option=parsed_json["brand"])
		optionsArray.append(brandoption)
		parsed_json["brand"]=brandoption.id
		request.session['brand'] = brandoption.option
	else:
		parsed_json['brand'] = None
		request.session['brand'] = ""

	cosmeticoption = CosmeticOption.objects.get(option=parsed_json["cosmetic"])
	optionsArray.append(cosmeticoption)


	featuresoption = [FeaturesOption.objects.get(option=feature) for feature in parsed_json["features"]]

	if 'frame' in parsed_json:
		frameoption = FrameOption.objects.get(option=parsed_json["frame"])
		optionsArray.append(frameoption)
		parsed_json["frame"]=frameoption.id

	else:
		parsed_json['frame'] = None

	parsed_json["features"]=[obj.id for obj in featuresoption]
	parsed_json["cosmetic"]=cosmeticoption.id
	parsed_json["bikeType"] = bikeoption.id
	form = BikeForm(parsed_json)

	if form.is_valid():
		print ("In the forms", form["bikeType"].value())
		parsed_json["djangoPrice"] = getBikePrice(optionsArray, featuresoption)
	else:
		print ("Not valid", form.errors.as_json())
	descriptionString = str(bikeoption.option + " " + request.session['brand'] + " " + cosmeticoption.option)
	bikePrice = parsed_json['djangoPrice']
	lightspeed = LightspeedApi()

	#let's not return pythonDictionary, instead let's return
	# finalResult = {'success': response.reason, 'bikeAdded': pythonDictionary}
	newBicycle = lightspeed.create_item(descriptionString, bikePrice, username)
	print ("submitted new Bicycle", newBicycle['bikeAdded'], "done")
	if newBicycle['success'] == 200:

	# session for label template
		request.session['customSku'] = newBicycle['bikeAdded']['customSku']

		request.session['type'] = bikeoption.option
		request.session['price'] = bikePrice
		return JsonResponse({'success' : True})
	else:
		return JsonResponse({'success' : False})

@login_required(login_url = '/login')
def component_post(request):
	parsed_json = json.loads(request.body)
	optionsArray = []

	descriptionString = ""
	componentType = ""

	saddleSelect = None
	handleSelect = None

	print 'made it to component post'
	if 'saddle' in parsed_json:
		saddleSelect = SaddleOption.objects.get(option=parsed_json['saddle'])
		optionsArray.append(saddleSelect)

		parsed_json['saddle'] = saddleSelect.id
		parsed_json['handlebar'] = None

		descriptionString = str(saddleSelect.option + " saddle")
		componentType = 'Saddle'

	elif 'handlebar' in parsed_json:
		handleSelect = HandlebarOption.objects.get(option=parsed_json['handlebar'])
		optionsArray.append(handleSelect)

		parsed_json['handlebar'] = handleSelect.id
		parsed_json['saddle'] = None

		descriptionString = str(handleSelect.option + " handlebar")
		componentType = 'Handlebar'

	form = componentForm(parsed_json)

	if form.is_valid():
		lightspeed = LightspeedApi()

		#returns pythonDictionary
		newComponent= lightspeed.create_item(descriptionString, parsed_json['price'])

		request.session['customSku'] = newComponent['customSku']

		if saddleSelect != None:
			request.session['brand'] = saddleSelect.option
		elif handleSelect != None:
			request.session['brand'] = handleSelect.option

		request.session['price'] = parsed_json['price']
		request.session['type'] = None
		return JsonResponse({'success' : True})

	else:
		print ("Not valid", form.errors.as_json())
		return JsonResponse(form.errors.as_json(), safe=False)






	# session for label template




def getBikePrice(optionsArray, featuresoption):
	basePrice = 200.00
	price_factor = 1
	nego_factor = 1.05
	for option in optionsArray:
		print option, option.price_factor
		price_factor *= option.price_factor
	for feature in featuresoption:
		print feature, feature.price_factor
		price_factor *= feature.price_factor
	print ("price factor", price_factor, basePrice * float(price_factor) * nego_factor)
	return format(basePrice * float(price_factor) * nego_factor, '.2f')

@login_required(login_url = '/login')
def print_label(request):
	label = {
		'customSku' : request.session['customSku'],
		'brand' : request.session['brand'],
		'price' : request.session['price'],
	}

	if request.session['type'] is not None:
		label['type'] = request.session['type']

	return render(request, 'bike_donations/barcode.html', label)

@login_required(login_url = '/login')
def component_data(request):
	context = {
		'Handlebars' : serialize_componentFactor(HandlebarOption.objects.all()),
		'Saddles' : serialize_componentFactor(SaddleOption.objects.all()),
	}

	return JsonResponse(context)

def serialize_componentFactor(query_set):
	comp = {}

	for obj in query_set:
		comp[obj.option] = {'status': False, 'price': obj.price}

	print comp
	return comp

@login_required(login_url = '/login')
def loggingout(request):
	logout(request)
	return HttpResponseRedirect('/login')








# def getBike(request):
# 	print (request.body)
# 	print request
# 	return render(request, 'bike_donations/confirmation.html')
