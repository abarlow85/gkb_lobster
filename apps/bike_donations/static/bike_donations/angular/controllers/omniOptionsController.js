angular.module('bikeSelect').controller('omniOptionsController',function($scope, $location, $rootScope, bikeOptionsFactory, boolService){
	$scope.headerText = "Add To Inventory"

	function determineUrl(){
		var urlType = [
			{
				'type': 'bike',
				'path': '/addBike',
				'message': "Add A Bike"
			},{
				'type': 'component',
				'path': '/addComponent',
				'message': "Add A Component"
			},{
				'type': 'find',
				'path': '/find',
				'message': "Find Item in Inventory"
			}
		];

		var urlObj;
		var element;
		var atHome = true;
		
		for (var i = 0; i < urlType.length; i++){
			urlObj = urlType[i];
			element = urlObj['type'];

			if (urlObj.path == $location.url()){
				$scope.headerText = urlObj.message;
				document.getElementById(element).disabled = true;

				atHome = false;
			}else{
				document.getElementById(element).disabled = false;
			}
		}

		if (atHome){
			$scope.headerText = "Add To Inventory"
		}
	}

	$rootScope.$watch(function() { 
   		return $location.path();
   	},  
   	function(newValue, oldValue) {  
      if (newValue != oldValue) { 
      	determineUrl()
      }
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
