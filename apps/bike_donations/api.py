import requests
import json
import string
import random

class LightspeedApi(object):
	auth = ('22dabb44da10a0d29347905309fd40dc5ad88bc3683927bb6be0d2142ba7c90b', 'apikey')
	oAuth = {
		'clientSecret':  '$2y$10$x/BNL8imH.5u.L.HWHE8l..5ENRXR4e5qW6lUT0/YCFdLVUi981yS',
		'clientKey': 'gkbplayground'
	}

	def get_temporaryToken(self):
		url = "https://cloud.merchantos.com/oauth/authorize.php?response_type=code&client_id=" + self.oAuth['clientKey'] + "&scope=employee:reports%20employee:inventory%20employee:register"

		response = requests.get(url)
		print response.content
		return


	def get_inventory(self):
		url = 'https://api.merchantos.com/API/Account/132193/Item.json'

		response = requests.get(url, auth=self.auth)
		return response.content

	def get_item(self, customSku):
		url = 'https://api.merchantos.com/API/Account/132193/Item/'+customSku+'.json'

		response = requests.get(url, auth=self.auth)
		return response.content

	def delete_item(self, id):
		url = 'https://api.merchantos.com/API/Account/132193/Item/'+id+'.json'
		response = requests.delete(url, auth=self.auth)
		print response
		return response.content

	def create_item(self, description, price, username):
		sku_chars = string.ascii_lowercase + string.ascii_uppercase + string.digits
		sku = "GKBD"
		for _ in range(8):
			sku += random.choice(sku_chars)
		url = 'https://api.merchantos.com/API/Account/132193/Item.json'
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
		#trying to add tags
		pythonDictionary['Tags'] = {}
		pythonDictionary['Tags']['@attributes'] = {"count":1}
		pythonDictionary['Tags']['tag'] = username


		#done adding tags
		json_data = json.dumps(pythonDictionary)
		response = requests.post(url, auth=self.auth, data=json_data)
		print response.reason
		return pythonDictionary
