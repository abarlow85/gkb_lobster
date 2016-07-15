import requests
import json
import string
import random

class LightspeedApi(object):
	auth = ('22dabb44da10a0d29347905309fd40dc5ad88bc3683927bb6be0d2142ba7c90b', 'apikey')

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


	def create_category(self):
		url = 'https://api.merchantos.com/API/Account/132193/Item.json'
		json_data = '{"@attributes":{"count":"1"},"customSku":"12345678902224","description":"Tibetan steel frame Huffy mountain bike average", "manufacturerID":"2","ItemShops":{"ItemShop":[{"qoh":"1","shopID":"1"}]}, "Prices":{"ItemPrice":[{"amount": "230", "useType":"Default", "useTypeID":"1"}]}}'
		print "This is json_data"
		print json_data
		response = requests.post(url, auth=self.auth, data=json_data)
		print dir(response)
		print response.reason
		return True



	def create_item(self, description, price):
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
		json_data = json.dumps(pythonDictionary)
		response = requests.post(url, auth=self.auth, data=json_data)
		print response.reason
		return pythonDictionary
