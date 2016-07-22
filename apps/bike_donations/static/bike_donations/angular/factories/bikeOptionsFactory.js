angular.module('bikeSelect').factory('bikeOptionsFactory', function($http, $window){

	var factory = {};
	var bikeData = {};
	var assembled_bike = {
		'price':200,
		'features':[]
	};
	var bikeNovel = true;
	var allVisitedAvailable = []
	var prepCache = {};

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

	factory.isBikeNovel = function(){
		return bikeNovel;
	};

	factory.pastAndIfFuture = function(currentSelect, callback){
		if (this.isInArray(allVisitedAvailable, currentSelect)){
			var returnObj = {};
			var index = allVisitedAvailable.indexOf(currentSelect);
			if (index >= 1){
				returnObj['past'] = allVisitedAvailable[index - 1];
			}

			if (index < allVisitedAvailable.length - 1){
				returnObj['next'] = allVisitedAvailable[index + 1]
			}
			callback(returnObj)
		}
	}


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
			bikeNovel = false;

            for(var object in response){
            	if (object != 'cosmetic') {
                	bikeData[object] = factory.letterBy(response[object])
                } else {
                	bikeData[object] = factory.pricedBy(response[object])
                }
            }

            prepCache.bikeType = {};
            for (var obj in bikeData.bikeType){
            	prepCache.bikeType[obj] = bikeData.bikeType[obj]['status']
            }
			callback(bikeData.bikeType)
		});
	}

	factory.clearHouse = function(alsoBikeType){
		for (var i = 0; i < 10; i++){
			console.log('WE ARE IN CLEAR HOUSE')
		};
		assembled_bike.features = [];
		assembled_bike.price = 200;

		if (!alsoBikeType){
			assembled_bike.price *= bikeData.bikeType.price_factor;
			allVisitedAvailable = ['bikeType'];
		}else{
			allVisitedAvailable = [];
		}

		for (var obj in bikeData){
			if (alsoBikeType || obj != 'bikeType'){
				if (obj != 'features'){
					if (obj in assembled_bike){
						delete assembled_bike[obj];
					}
				}

				for (var item in bikeData[obj]){
					bikeData[obj][item]['status'] = false;
				}

				if (obj in prepCache){
					delete prepCache[obj]
				}
			}
		}
	};

	factory.ifBikeTypeGetBikeType = function(){
		if ('bikeType' in bikeData){
			return bikeData.bikeType
		}
	};

	factory.checkData = function(){
		return bikeData;
	};

	factory.somethingVisitedAlsoAvailable = function(newSection){
		if (this.isInArray(allVisitedAvailable, newSection) == false){
			allVisitedAvailable.push(newSection)
		}
	}

	factory.receivePrepScope = function(currentSelect, count){
		if (currentSelect in prepCache){
			return prepCache[currentSelect];
		}else{
			this.assembleScope(currentSelect,true,function(){
				if (currentSelect in prepCache){
					return prepCache[currentSelect];
				}else{
					return;
				}
			})
		}
	};

	factory.isInArray = function(arr, thing){
		for (var i = 0; i < arr.length; i++){
			if (thing == arr[i]){
				return true;
			}
		}
		return false;
	}

	factory.assembleScope = function(select, current, callback){
		var itemArr = ["bikeType","brand","frame","cosmetic","features"]
		if (!current){
			selectIndex = itemArr.indexOf(select) + 1
		}else{
			selectIndex = itemArr.indexOf(select)
		}

		while (selectIndex < itemArr.length){
			var currentObject = bikeData[itemArr[selectIndex]];
			prepCache[itemArr[selectIndex]] = {};
			for(var opt in currentObject){

				if (opt != 'status' && itemArr[selectIndex] != 'bikeType'){
					var requiredArr = currentObject[opt]['requisites']
					var mustHave;

					for (var wIndex = 0; wIndex < requiredArr.length; wIndex++){
						mustHave = requiredArr[wIndex];

						if (bikeData.bikeType[mustHave]['status'] == true){
							break;
						}
					};

					if (wIndex != requiredArr.length){
						prepCache[itemArr[selectIndex]][opt] = currentObject[opt]['status'];
					};
				}else{
					prepCache[itemArr[selectIndex]][opt] = currentObject[opt]['status'];
				}
			}

			if (Object.keys(prepCache[itemArr[selectIndex]]).length != 0){
				console.log('wow let\'s look at prepCache', prepCache)
				if (!callback){
					return(itemArr[selectIndex]);
				}else{
					callback();
				}

			}else{
				delete prepCache[itemArr[selectIndex]]
			}

			selectIndex += 1;
		}
		return;
	};

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
		for (var i = 0; i < 200; i++){
			console.log('SELECT CHECK CHECK', select)
		}
		if (select != "features"){
			assembled_bike[select] = option
			bikeData[select][option]["status"] = true;
			prepCache[select][option] = true;
		}else{
			assembled_bike['features'].push(option)
		}

		for (var selection in bikeData[select]){
			if (select != "features"){
				if (selection != option){
					bikeData[select][selection]["status"] = false;
					if (selection in prepCache[select]){
						prepCache[select][selection] = false;
					}
				}
			}else if (selection == option){
				if (bikeData[select][selection]["status"]== false){
					bikeData[select][selection]["status"] = true;
					if (selection in prepCache[select]){
						prepCache[select][selection] = true;
					}
				}else{
					bikeData[select][selection]["status"] = false;
					if (selection in prepCache[select]){
						prepCache[select][selection] = false;
					}
				}
			}
		}

		console.log('is THIS WHERE IT ALL GOES WRONG', prepCache)
		if (select == 'bikeType'){
			console.log('!!!!!!!!!!!!BIKE TYPE CLEAR HOUSE')
			this.clearHouse()
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