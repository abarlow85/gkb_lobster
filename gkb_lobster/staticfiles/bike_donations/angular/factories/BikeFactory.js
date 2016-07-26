angular.module('bikeSelect').factory('BikeFactory', function($http, $window){

	var factory = {};
	var data = []
	var bikeType, brand, cosmetic, frame;
	var features = [];

	var selectedType, selectedBrand, selectedCosmetic, selectedFrame;
	var selectedFeatures = [];
	var bikeObject = {}


	factory.selectionData = function(callback){
		$http.get('/form').success(function(response){
			bikeType = factory.letterBy(response.bikeType);
			brand = factory.letterBy(response.brand);
			cosmetic = factory.pricedBy(response.cosmetic);
			frame = factory.letterBy(response.frame);
			features = factory.letterBy(response.features);

			callback(bikeType)
		});
	}

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

	};


	factory.addBikeType = function(bike, callback){
		this.reset();
		selectedType = bike;
		bikeObject.bikeType = bike;


		nextOptions = this.getNextOptions()
		callback(selectedType, nextOptions)

	}

	factory.brandSelection = function(brand, callback){
		selectedBrand = brand;
		bikeObject.brand = brand;
		callback(selectedBrand)
	}

	factory.cosmeticSelection = function(cosmetic, callback){
		selectedCosmetic = cosmetic;
		bikeObject.cosmetic = cosmetic;
		callback(selectedCosmetic)
	}

	factory.frameSelection = function(frame, callback){
		selectedFrame = frame;
		bikeObject.frame = frame;
		callback(selectedFrame);
	}

	factory.completeBike = function(bike, callback){
		selectedFeatures = bike.features;
		bikeObject.features = bike.features;
		bikeObject.quantity = bike.quantity;
		callback(bikeObject);
	}

	factory.postBike = function(callback){
		$http.post('/donateBikePost/', bikeObject).success(function(response){
			if (response.success == true) {
					$window.location = "/print/"
			}
			else {
				callback(response.error)
			}
		});
	}

	factory.reset = function(){
		selectedType = '';
		selectedBrand = '';
		selectedCosmetic = '';
		selectedFrame = '';
		selectedFeatures = []
		bikeObject = {}

	}

	factory.getNextOptions = function(){
		nextOptions = {
			'brand' : [],
			'cosmetic' : [],
			'frame' : [],
			'features' : [],
			'quantity' : 1,
		}

		for (var brd in brand) {
			var requisites = brand[brd].requisites;
			for (var req in requisites) {

				if (requisites[req] == selectedType) {
					nextOptions.brand.push(brd);
				}
			}
		}

		for (var cos in cosmetic) {
			var requisites = cosmetic[cos].requisites;
			for (var req in requisites) {

				if (requisites[req] == selectedType) {
					nextOptions.cosmetic.push(cos);
				}
			}
		}

		for (var frm in frame) {
			var requisites = frame[frm].requisites;
			for (var req in requisites) {

				if (requisites[req] == selectedType) {
					nextOptions.frame.push(frm);
				}
			}
		}

		for (var feat in features) {
			var requisites = features[feat].requisites;
			for (var req in requisites) {

				if (requisites[req] == selectedType) {
					nextOptions.features.push(feat);
				}
			}
		}

		for (var key in nextOptions) {
			if (nextOptions[key].length == 0) {
				delete nextOptions[key];
			}
		}

		return nextOptions;
	}




	return factory;

});
