angular.module('bikeSelect').controller('omniOptionsController',function($scope, $location, $rootScope, pageService, bikeOptionsFactory, boolService){
	if (!$scope.headerText){
		$scope.headerText = "Add To Inventory"
	}

	$rootScope.$watch(function() { 
   		return $location.path();
   	},  
   	function(newValue, oldValue) {  
      	pageService.determineUrl(function(newHeader){
      		$scope.headerText = newHeader
      	});
   	},true);

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
