angular.module('bikeSelect').controller('omniOptionsController',function($scope, $location, bikeOptionsFactory, boolService){

	var location = document.getElementById('controllerSelect')
	if (location.getAttribute('ng-controller') == 'bikeOptionsController') {
		$location.path('/addBike');
	} else {
		$location.path('/addComponent');
	}

});
