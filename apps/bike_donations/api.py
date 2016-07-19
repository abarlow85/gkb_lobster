import requests
import json
import string
import random

class LightspeedApi(object):
	acnt = '132944'
	auth = ('18aac7b75d65b454ce0653bd60873ea4c1eae65fa7754209378eb42b745b3830', 'apikey')

	def get_inventory(self):
		url = 'https://api.merchantos.com/API/Account/'+self.acnt+'/Item.json'

		response = requests.get(url, auth=self.auth)
		return response.content

	def get_item(self, customSku):
		url = 'https://api.merchantos.com/API/Account/'+self.acnt+'/Item/'+customSku+'.json'

		response = requests.get(url, auth=self.auth)
		return response.content

	def delete_item(self, id):
		url = 'https://api.merchantos.com/API/Account/'+self.acnt+'/Item/'+id+'.json'
		response = requests.delete(url, auth=self.auth)
		print response
		return response.content

	def create_item(self, description, price, username):
		sku_chars = string.ascii_lowercase + string.ascii_uppercase + string.digits
		sku = "GKBD"
		for _ in range(8):
			sku += random.choice(sku_chars)
		url = 'https://api.merchantos.com/API/Account/'+self.acnt+'/Item.json'
		pythonDictionary = {}
		pythonDictionary["description"] = description
		pythonDictionary["customSku"] = sku
		pythonDictionary['ItemShops'] = {}
		pythonDictionary['ItemShops']['ItemShop'] = {}
		pythonDictionary['ItemShops']['ItemShop']['qoh'] = 1
		pythonDictionary['ItemShops']['ItemShop']['shopID'] = 1
		pythonDictionary['Prices'] = {}
		pythonDictionary['Prices']['ItemPrice']={}
		pythonDictionary['Prices']['ItemPrice']['amount'] = price
		pythonDictionary['Prices']['ItemPrice']['useType'] = "Default"
		pythonDictionary['Prices']['ItemPrice']['useTypeID'] = 1
		#bad stuff, trying to break it
		pythonDictionary['Tags'] = []
		pythonDictionary['Tags'].append("squiddy")
		# done trying to break it
		#trying to add tags -- the good stuff
		# pythonDictionary['Tags'] = {}
		# pythonDictionary['Tags']['@attributes'] = {"count":1}
		# pythonDictionary['Tags']['tag'] = username

		#done adding tags == the good stuff
		json_data = json.dumps(pythonDictionary)
		response = requests.post(url, auth=self.auth, data=json_data)
		print response.reason
		print dir(response)
		print ("Status code", response.status_code)
		finalResult = {'success': response.status_code, 'bikeAdded': pythonDictionary}
		print ("Here's the final result", finalResult)
		# return pythonDictionary
		return finalResult
