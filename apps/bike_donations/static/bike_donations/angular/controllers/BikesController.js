angular.module('bikeSelect').controller('BikesController', function($scope, $location, $window, BikeFactory){
	
	var location = document.getElementById('controllerSelect')
	if (location.getAttribute('ng-controller') == 'BikesController') {
		$location.path('/addBike');
	} else {
		$location.path('/addComponent');
	}

	$scope.typeSelect;
	$scope.brandSelect;
	$scope.cosmeticSelect;
	$scope.frameSelect;
	$scope.featuresSelect = []

	BikeFactory.selectionData(function(data){

		$scope.bikeType = data
	});

	$scope.addBikeType = function(bike){
		BikeFactory.addBikeType(bike, function(response) {
			
		});
	}


});
