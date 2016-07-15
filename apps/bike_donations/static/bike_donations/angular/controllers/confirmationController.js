angular.module('bikeSelect').controller('confirmationController', function($scope, $location, bikeOptionsFactory, scrollService, boolService){
		console.log("in new controller");
		console.log(bikeOptionsFactory.assembled_bike);
		$scope.bike_info = bikeOptionsFactory.assembled_bike
		// $scope.bike_info = bike;
		// console.log($scope.bike_info)
		// console.log("getting bike info");
		// console.log(bike)
		// $location.path('/confirm');

	});
