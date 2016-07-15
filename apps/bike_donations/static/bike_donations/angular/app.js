angular.module('bikeSelect', ['ngCookies','ngRoute'])
	.config(['$interpolateProvider', '$httpProvider','$routeProvider','$locationProvider',
		function($interpolateProvider, $httpProvider, $routeProvider, $locationProvider){
			$routeProvider
				.when('/addBike', {
		 			templateUrl: 'static/bike_donations/angular/partials/addBike.html'
		 		})
		 		.when('/addComponent',{
		 			templateUrl: 'static/bike_donations/angular/partials/components.html'
		 		})

		 	// $locationProvider.html5Mode({
  		// 		enabled: true,
  		// 		requireBase: false
		 	// });

			$interpolateProvider.startSymbol('[[').endSymbol(']]');

			$httpProvider.defaults.xsrfCookieName = 'csrftoken';
        	$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
	}])
