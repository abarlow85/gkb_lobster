angular.module('bikeSelect').controller('omniOptionsController',function($scope, $location, $rootScope, pageService, bikeOptionsFactory, boolService){
	$scope.omniLink
	$rootScope.$watch(function() { 
   		return $location.path();
   	},function(newValue, oldValue) {  
   		console.log('our new url', newValue)
      	pageService.determineUrl();
   	}, true);

   	console.log($scope.omniLink)

   	$scope.getRedirect = function(init){
   		pageService.menuInput(init)
   	}

});
