angular.module('bikeSelect').factory('inventoryFactory', function($http){
	var factory = {}
	var data;

	factory.getItem = function(sku, callback){
		if (sku){
			$http.get('find/items/'+sku).success(function(response){
				data = JSON.parse(response);
				callback(data.Item);
			});
		}
	}

	factory.deleteItem = function(id, callback){
		$http.post('find/items/delete', id).success(function(response){
			callback(response);
		});
	}

	return factory
});