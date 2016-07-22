angular.module('bikeSelect').controller('bikeOptionsController', function($scope, $location, $window, bikeOptionsFactory, scrollService, boolService){
	var location = document.getElementById('controllerSelect')
	if (location.getAttribute('ng-controller') == 'bikeOptionsController') {
		$location.path('/addBike');
	} else {
		$location.path('/addComponent');
	}

	$scope.bikeType = {};
	$scope.features = [];
	$scope.assembled_bike = {};

	$scope.next = false;

	console.log("scoping brand", $scope.brand)

	boolService.forceSelect('bike', 10)


	bikeOptionsFactory.selectionData(function(data){

		for (var key in data){
			$scope.bikeType[key] = data[key]['status']
		}
	});

	$scope.$watch(function() {
		return boolService.returnSelect('bike');
	}, function(newValue, oldValue) {
		$scope.bikeOption = newValue;
	});

	$scope.$watch(function() {
		return boolService.returnSelect('product');
	}, function(newValue, oldValue) {
		$scope.productOption = newValue.status;
	}, true);


	function optionClicked(type, select, prep){
		var selectArr = ["brand", "cosmetic", "frame", "features"];

		if (select && select !="placed"){

			if (type == "bikeType"){
				var selectionBool;
				bikeOptionsFactory.clearHouse();
				$scope.assembled_bike = {};
				for (var idx = 0; idx < selectArr.length; idx++){
					selectionBool = selectArr[idx]
					$scope.selected[selectionBool] = "";
					$scope[selectionBool] = ""
				};
			}

			$scope[type][select] = true;

			if (type != "features"){
				for (var opt in $scope[type]){
					if (opt != select){
						$scope[type][opt] = false;
					}
				}
			}

			bikeOptionsFactory.valueSelect(type, select);

			if(prep){

				var pIndex = selectArr.indexOf(prep)
				while(pIndex < selectArr.length){

					var nObject = bikeOptionsFactory.assembleScope(selectArr[pIndex])
					if (Object.keys(nObject).length != 0){
						$scope[selectArr[pIndex]] = nObject;
						break;
					}else{
						console.log('let\'s do next')
						if (Object.keys(nObject)[0] == "Other"){
							bikeOptionsFactory.data.brand.Other.status = true;
						}
						$scope.selected[selectArr[pIndex]] = "placed"
					}

					pIndex++
				}

				var change = function(){
					scrollService.scrollTo(selectArr[pIndex]);
				}

				setTimeout(change, 20)
			}
		};
	}

	$scope.editJump = function(elmID){
		console.log("passed ID", elmID)
		scrollService.scrollTo(elmID);
	}


	$scope.selected = {};
	$scope.selected.quantity = 1;

	$scope.$watch('selected.type',function(){
		optionClicked("bikeType",$scope.selected.type, "brand")
	});

	$scope.$watch('selected.brand',function(){
		optionClicked("brand",$scope.selected.brand, "cosmetic")
	});

	$scope.$watch('selected.cosmetic',function(){
		optionClicked("cosmetic",$scope.selected.cosmetic, "frame")
	});

	$scope.$watch('selected.frame',function(){
		optionClicked("frame",$scope.selected['frame'], "features")
	});

	$scope.checkbox = function(item){

		bikeOptionsFactory.valueSelect("features", item);
		bikeOptionsFactory.assembleBike(function(bike){
			$scope.assembled_bike=bike;
		});

	};

	$scope.getBike = function(){

		// event.preventDefault();
		console.log("printing quantity",$scope.selected.quantity);

		if ($scope.selected.quantity && $scope.selected.quantity <= 20 && $scope.selected.quantity > 0){
			$scope.posted = true;
			$scope.error = false;

			bikeOptionsFactory.assembleBike(function(bike){
				$scope.bike_info = bike;
				$scope.bike_info["quantity"] = $scope.selected.quantity;
				console.log("bike", bike);
				bikeOptionsFactory.postBike(bike, function(data){
					$scope.error = data;
					console.log(data);
				})
			});
		}
		else{
			console.log("quantity exceeds");
		}


	};

	$scope.goBack = function(){
		$window.location = "/"
	}

	$scope.confirm = function(){
		console.log("going to confirm");
		bikeOptionsFactory.assembleBike(function(bike){
			$scope.assembled_bike=bike;
			$scope.posted = false
		});
		$scope.checkBike = true;
	}

});
