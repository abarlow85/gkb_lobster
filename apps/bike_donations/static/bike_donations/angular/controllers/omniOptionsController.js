angular.module('bikeSelect').controller('omniOptionsController',function($scope, $location, bikeOptionsFactory, boolService){
	$scope.bikeOption = boolService.returnSelect('bike');
	$scope.componentOption = boolService.returnSelect('component');
	$scope.otherOption = boolService.returnSelect('other');

	function determineUrl(){
		var urlArray = ['/addBike', '/addComponent', '/find']
		var headerArray = ["Add A Bike", "Add A Component", "Find Item in Inventory"]
		var bool = true
		for (var i = 0; i < urlArray.length; i++){
			if (urlArray[i] == $location.url()){
				$scope.headerText = headerArray[i]
				break;
			}
		}

		if (i == urlArray.length){
			$scope.headerText = "Add To Inventory"
		}
	}

	determineUrl()


	$scope.$watch(function() {
		return boolService.returnSelect('bike');
	}, function(newValue, oldValue) {
		$scope.bikeOption = newValue;
		document.getElementById('bike').disabled = newValue;
	});

	$scope.$watch(function() {
		return boolService.returnSelect('component');
	}, function(newValue, oldValue) {
		$scope.componentOption = newValue;
		document.getElementById('component').disabled = newValue;
	});

	$scope.$watch(function() {
		return boolService.returnSelect('other');
	}, function(newValue, oldValue) {
		$scope.otherOption = newValue;
		document.getElementById('other').disabled = newValue;
	});

	$scope.buttonClicked = function(selection){
		boolService.toggleSelect(selection);
		if (selection == 'bike'){
			$location.path('/addBike')
		}else if (selection == 'component'){
			$location.path('/addComponent')
		}
	};

	$scope.create_category = function(){
		bikeOptionsFactory.create_category();
	}


});
