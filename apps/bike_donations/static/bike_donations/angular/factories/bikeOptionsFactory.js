angular.module('bikeSelect').factory('bikeOptionsFactory', function($http, $window){
		var factory = {};
		factory.data = {};
		var assembled_bike = {};

		factory.letterBy = function(passObject){
			var letteredArr = Object.keys(passObject);

			for (var iOne = 0; iOne < letteredArr.length - 1; iOne++){
				var min = iOne;

				for (var iTwo = iOne+1; iTwo < letteredArr.length; iTwo++){
					if (letteredArr[iTwo][0] <letteredArr[min][0]){
						min = iTwo;
					}
				};

				var temp = letteredArr[iOne];
				letteredArr[iOne] = letteredArr[min];
				letteredArr[min] = temp;
			}

			var finalObj = {};
			for (var x = 0; x < letteredArr.length; x++){
				var key = letteredArr[x]
				if (key != 'status'){
					finalObj[key] = passObject[key];
				}
			};

			return finalObj
		};

		factory.pricedBy = function(passObject){
			var pricedArr = Object.keys(passObject)

			function tradeIndexForPrice(index){
				return (Number(passObject[pricedArr[index]]['price_factor']))
			}

			for (var iOne = 0; iOne < pricedArr.length - 1; iOne++){
				var max = iOne;

				for (var iTwo = iOne+1; iTwo < pricedArr.length; iTwo++){
					if (tradeIndexForPrice(iTwo) > tradeIndexForPrice(max)){
						max = iTwo;
					}
				};

				var temp = pricedArr[iOne];
				pricedArr[iOne] = pricedArr[max];
				pricedArr[max] = temp;
			}

			var finalObj = {};

			for(var index = 0; index < pricedArr.length; index++){
				var key = pricedArr[index]
				finalObj[key] = passObject[key]
			};

			return finalObj

		}

		factory.selectionData = function(callback){
			$http.get('/form').success(function(response){
				factory.data = {};

                for(var object in response){
                	if (object != 'cosmetic') {
                    	factory.data[object] = factory.letterBy(response[object])
                    } else {
                    	factory.data[object] = factory.pricedBy(response[object])
                    }
                }

				callback(factory.data.bikeType)
			});
		}

		factory.clearHouse = function(){
			for (var obj in this['data']){
				if (obj != 'bikeType'){
					for (var item in this['data'][obj]){
						this['data'][obj][item]['status'] = false
					}
				}
			}
		}

		factory.assembleScope = function(select){
			var forScope = {};


			for (var opt in this['data'][select]){

				if (opt != 'status'){
					var requiredArr = this['data'][select][opt]['requisites']
					var mustHave;

					for (var wIndex = 0; wIndex < requiredArr.length; wIndex++){
						mustHave = requiredArr[wIndex];

						if (this.data.bikeType[mustHave]['status'] == true){

							break;
						}
					};


					if (wIndex != requiredArr.length){
						forScope[opt] = false;
					}
				}
			};

			return forScope;
		}

		factory.getBike = function(){
			$http.post('/confirmation/', {status: true}).success(function(){
				// console.log();
			});
		}

		factory.postBike = function(bikeObject, callback){
			$http.post('/donateBikePost/',bikeObject).success(function(response){
				if (response.success == true) {
					$window.location = "/print/"
				}
				else {
					console.log("Ohhh a failure")
					callback(response.error)
				}
			});
		}


		factory.valueSelect = function(select, option){
			console.log("we are in value select")
			if (select != "features"){
				this.data[select][option]["status"] = true;
			}

			for (var selection in this.data[select]){
				if (select != "features"){
					if (selection != option){
						this.data[select][selection]["status"] = false;
					}
				}else if (selection == option){
					if (this.data[select][selection]["status"]== false){
						this.data[select][selection]["status"] = true;
					}else{
						this.data[select][selection]["status"] = false;
					}
				}
			}
		};

		factory.assembleBike = function(callback){
			var bikeFinal = {
				"price": 200,
				"features":[]
			};

			for (var sType in this['data']){
				var tempType = this['data'][sType]
				for (var opt in tempType){
					if (tempType[opt].status == true){
						if (sType != "features"){
							bikeFinal[sType] = opt
						}else{
							bikeFinal.features.push(opt)
						}
						bikeFinal.price *= tempType[opt].price_factor;
					};
				}
			}
			callback(bikeFinal)
		}


		return factory
	});
