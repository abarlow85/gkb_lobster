angular.module('bikeSelect').factory('componentOptionsFactory', function($http){

	factory = {};
	var data = {};
	componentProduct = {};
	factory.createComponentProduct = function(info){
		componentProduct = info;
	}

	factory.clearComponentProduct = function(){
		componentPost = {};
	}

	factory.getAllComponents = function(callback){
		$http.get('/componentForm').success(function(response){
			factory.data = response
			callback(response)
		});
	};

	factory.sendComponentToServer = function(quantity,callback){
		var info = componentProduct;
		info["quantity"] = quantity;
		if (Object.keys(info).length != 0) {
			$http.post('/componentPost/', info).success(function(response){
				callback(response);
			});
		}else{
			console.log("no component product in factory");
		}
	}

	return factory
});