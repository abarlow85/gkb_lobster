angular.module('bikeSelect').factory('componentOptionsFactory', function($http){

	factory = {};

	factory.getAllComponents = function(callback){
		$http.get('/componentForm').success(function(response){
			factory.data = response
			callback(response)
		});
	};

	factory.sendComponentToServer = function(info, callback){
		data = {
			'price': this.data[info.type][info.item]['price']
		}

		if (info.type == "Saddles"){
			data['saddle'] = info.item;
		}else if (info.type == 'Handlebars'){
			data['handlebar'] = info.item;
		}
		$http.post('/componentPost/', data).success(function(response){
			callback(response);
		});
	}

	return factory
});