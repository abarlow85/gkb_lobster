angular.module('bikeSelect').controller('omniOptionsController',function($scope, $location, bikeOptionsFactory, boolService){
	$scope.bikeOption = boolService.returnSelect('bike');
	$scope.componentOption = boolService.returnSelect('component');
	$scope.otherOption = boolService.returnSelect('other');

	function changeHeader(newValue, messageString){
		if (newValue){
			$scope.headerText = messageString
		}
	}

	$scope.$watch(function() {
		return boolService.returnSelect('bike');
	}, function(newValue, oldValue) {
		$scope.bikeOption = newValue;
		changeHeader(newValue, "Add a Bike")
		document.getElementById('bike').disabled = newValue;
	});

	$scope.$watch(function() {
		return boolService.returnSelect('component');
	}, function(newValue, oldValue) {
		$scope.componentOption = newValue;
		changeHeader(newValue, "Add a Component")
		document.getElementById('component').disabled = newValue;
	});

	$scope.$watch(function() {
		return boolService.returnSelect('other');
	}, function(newValue, oldValue) {
		$scope.otherOption = newValue;
		changeHeader(newValue, "Find an Item")
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
