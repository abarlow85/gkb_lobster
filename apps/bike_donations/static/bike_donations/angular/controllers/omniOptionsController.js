
angular.module('bikeSelect').controller('omniOptionsController',function($scope, $location, $rootScope, pageService, bikeOptionsFactory, boolService){
	if (!$scope.headerText){
		$scope.headerText = "Add To Inventory";
	}

	var location = document.getElementById('controllerSelect');
	if (location.getAttribute('ng-controller') == 'bikeOptionsController') {
		$location.path('/addBike');
	} else {
		$location.path('/addComponent');
	}

	$rootScope.$watch(function() { 
   		return $location.path();
   	},function(newValue, oldValue) {  
      	pageService.determineUrl(function(newHeader){
      		$scope.headerText = newHeader;
      	});
   	},true);

	$scope.buttonClicked = function(selection){
		boolService.toggleSelect(selection);
		if (selection == 'bike'){
			$scope.loadFindPartial = false
			$location.path('/addBike')
		}else if (selection == 'component'){
			$scope.loadFindPartial = false
			$location.path('/addComponent')
		} else if (selection == 'find'){
			$scope.loadFindPartial = true
			$location.path('/find')
		}
	};

	$scope.create_category = function(){
		bikeOptionsFactory.create_category();
	}


});
