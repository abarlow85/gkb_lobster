angular.module('gkbInv').factory('inventoryFactory', function($http){
	var factory = {}
	var data;

	factory.getItem = function(sku, callback){
		if (sku){
			$http.get('items/'+sku).success(function(response){
				console.log(response);
				data = response;
				callback(data);
			});
		}
	}

	factory.deleteItem = function(id, callback){
		$http.post('items/delete', id).success(function(response){
			callback(response);
		});
	}

	return factory
});