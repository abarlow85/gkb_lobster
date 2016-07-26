angular.module('bikeSelect').factory('componentOptionsFactory', function($http){

	factory = {};
	factory.componentProduct = {};
	factory.createComponentProduct = function(info){
		this.componentProduct = info;
	}

	factory.clearComponentProduct = function(){
		this.componentPost = {};
	}

	factory.getAllComponents = function(callback){
		$http.get('/componentForm').success(function(response){
			console.log("printing response",response);
			factory.data = response
			callback(response)
		});
	};

	factory.sendComponentToServer = function(callback){
		var info = factory.componentProduct;
		delete info.choices;
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
