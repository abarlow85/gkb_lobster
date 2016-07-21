angular.module('bikeSelect').factory('bikeOptionsFactory', function($http, $window){

	var factory = {};
	var bikeData = {};
	var assembled_bike = {
		'price':200,
		'features':[]
	};

	var prepScope = {};

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
			bikeData = {};

            for(var object in response){
            	if (object != 'cosmetic') {
                	bikeData[object] = factory.letterBy(response[object])
                } else {
                	bikeData[object] = factory.pricedBy(response[object])
                }
            }
			callback(bikeData.bikeType)
		});
	}

	factory.clearHouse = function(alsoBikeType){
		assembled_bike.features = [];
		assembled_bike.price = 200;

		if (!alsoBikeType){
			assembled_bike.price *= assembled_bike.bikeType.price_factor;
		}

		for (var obj in bikeData){
			if (!alsoBikeType || obj != 'bikeType'){
				if (obj != 'features'){
					delete assembled_bike[obj];
				}

				for (var item in bikeData[obj]){
					bikeData[obj][item]['status'] = false;
				}
			}
		}
	}

	factory.checkData = function(){
		return bikeData;
	}

	factory.receivePrepScope = function(){
		var returnScope = prepScope
		prepScope = {};
		return returnScope;
	}

	factory.assembleScope = function(select){
		console.log(select)
		var itemArr = ["bikeType","brand","frame","cosmetic","features"]
		console.log(itemArr)
		selectIndex = itemArr.indexOf(select) + 1

		while (selectIndex < itemArr.length){
			var currentObject = bikeData[itemArr[selectIndex]];
			for(var opt in currentObject){

				if (opt != 'status'){
					var requiredArr = currentObject[opt]['requisites']
					var mustHave;

					for (var wIndex = 0; wIndex < requiredArr.length; wIndex++){
						mustHave = requiredArr[wIndex];

						if (bikeData.bikeType[mustHave]['status'] == true){
							break;
						}
					};

					if (wIndex != requiredArr.length){
						prepScope[opt] = false;
					};
				}
			}

			if (Object.keys(prepScope).length != 0){
				return(itemArr[selectIndex]);
			}
			selectIndex += 1;
		}

		return;
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

	factory.getBike = function(){
		$http.post('/confirmation/', {status: true}).success(function(){
			// console.log();
		});
	}

	factory.postBike = function(bikeObject){
		$http.post('/donateBikePost/',bikeObject).success(function(response){
			if (response.success == true) {
				$window.location = "/print/"
			}
		});
	}


	factory.valueSelect = function(select, option){
		if (select != "features"){
			assembled_bike[select] = option
			bikeData[select][option]["status"] = true;
		}else{
			assembled_bike['features'].push(option)
		}

		for (var selection in bikeData[select]){
			if (select != "features"){
				if (selection != option){
					bikeData[select][selection]["status"] = false;
				}
			}else if (selection == option){
				if (bikeData[select][selection]["status"]== false){
					bikeData[select][selection]["status"] = true;
				}else{
					bikeData[select][selection]["status"] = false;
				}
			}
		}
	};

	factory.assembleBike = function(callback){
		var bikeFinal = {
			"price": 200,
			"features":[]
		};

		for (var sType in bikeData){
			var tempType = bikeData[sType]
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
