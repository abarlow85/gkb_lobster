angular.module('bikeSelect', ['ngRoute'])
	.config(['$interpolateProvider', '$httpProvider','$routeProvider',
		function($interpolateProvider, $httpProvider, $routeProvider){
			$routeProvider
				.when('/addBike', {
		 			templateUrl: 'static/bike_donations/angular/partials/addBike.html'
		 		})
		 		.when('/addComponent',{
		 			templateUrl: 'static/bike_donations/angular/partials/components.html'
		 		})

			$interpolateProvider.startSymbol('[[').endSymbol(']]');

			$httpProvider.defaults.xsrfCookieName = 'csrftoken';
        	$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
	}])
