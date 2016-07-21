angular.module('bikeSelect').controller('bikeOptionsController', function($scope, $routeParams, $location, $window, bikeOptionsFactory, scrollService, boolService){
	$scope.bikeType = {};
	$scope.features = [];
	$scope.assembled_bike = {};
	$scope.menuData = {};

	$scope.currentSelect = $routeParams.menuItem;
	var typeHead = {
		'bikeType': 'Select a Bike',
		'brand': 'Select a Brand',
		'frame': 'Select a Frame',
		'cosmetic': 'Choose Cosmetic Quality',
		'features': 'Add Features'
	}
	var typeArray = Object.keys(typeHead);
	$scope.subHeaderText = typeHead[$routeParams.menuItem]
	console.log($scope.subHeaderText)


	if ($scope.currentSelect == 'bikeType'){
		bikeOptionsFactory.selectionData(function(data){
		console.log(data)
			for (var key in data){
				$scope.menuData[key] = data[key].status
			}
		});
	}else{
		var prep = bikeOptionsFactory.receivePrepScope()
		if (Object.keys(prep).length < 2){
			$location.path('/addBike/bikeType');
		}else{
			$scope.menuData = prep;
		}
	}

	$scope.itemSelected = function(item){
		$scope.selected[$scope.currentSelect] = item;
		bikeOptionsFactory.valueSelect($scope.currentSelect, item)
		var nextPath = bikeOptionsFactory.assembleScope($scope.currentSelect);
		$location.path('addBike/' + nextPath)
	}

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


	function optionClicked(type, select){
		var selectArr = ["brand", "cosmetic", "frame", "features"];

		if (type == 'bikeType'){
			prep = selectArr[0]
		}else if (type != 'features'){
			prep = selectArr[selectArr.indexOf(select)]
		}

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
						$scope.selected[selectArr[pIndex]] = "placed"
					}


					pIndex++
				}

				// <!--var change = function(){
				// 	scrollService.scrollTo(selectArr[pIndex]);
				// }

				// setTimeout(change, 20)
			}
		};
	}

	$scope.editJump = function(elmID){
		console.log("passed ID", elmID)
		scrollService.scrollTo(elmID);
	}


	$scope.selected = {};

	// $scope.$watch('selected.type',function(){
	// 	optionClicked("bikeType",$scope.selected.type, "brand")
	// });

	// $scope.$watch('selected.brand',function(){
	// 	optionClicked("brand",$scope.selected.brand, "cosmetic")
	// });

	// $scope.$watch('selected.cosmetic',function(){
	// 	optionClicked("cosmetic",$scope.selected.cosmetic, "frame")
	// });

	// $scope.$watch('selected.frame',function(){
	// 	optionClicked("frame",$scope.selected['frame'], "features")
	// });


	$scope.checkbox = function(item){

		bikeOptionsFactory.valueSelect("features", item);
		bikeOptionsFactory.assembleBike(function(bike){
			$scope.assembled_bike=bike;
		});

	};

	$scope.getBike = function(){

		// event.preventDefault();
		$scope.posted = true
		bikeOptionsFactory.assembleBike(function(bike){
			$scope.bike_info = bike;
			bikeOptionsFactory.postBike(bike)
		});

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
