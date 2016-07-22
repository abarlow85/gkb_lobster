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
	$scope.formIndex = 0;
	$scope.nextName = 'bikeType'
	

	BikeFactory.selectionData(function(data){
		$scope.bikeType = data
	});

	$scope.addBikeType = function(option){
		
		BikeFactory.addBikeType(option, function(selection, nextOptions) {
			$scope.typeSelect = selection;
			$scope.allOptions = nextOptions;
			$scope.remainingOptions = nextOptions;
			$scope.history = ['bikeType']
			$scope.selected = true
			console.log($scope.allOptions)
			
		});
	}

	$scope.nextBtn = function(){
		$scope.selected = false

		for (var remaining in $scope.remainingOptions) {
			$scope.nextOptions = $scope.allOptions[remaining];
			$scope.nextName = remaining;
			delete $scope.remainingOptions[remaining]
			break;
		}

		if (Object.keys($scope.remainingOptions) == 0) {
			$scope.complete = true
			return;
		}
		
	}

	$scope.brandSelection = function(option) {
		
		BikeFactory.brandSelection(option, function(selection) {
			$scope.brandSelect = selection;
			$scope.history.push('brand');
			$scope.selected = true


		});

		
	}

	$scope.cosmeticSelection = function(option) {
		BikeFactory.cosmeticSelection(option, function(selection) {
			$scope.cosmeticSelect = selection;
			$scope.history.push('cosmetic');
			$scope.selected = true


		});

		
	}

	$scope.frameSelection = function(option) {
		BikeFactory.frameSelection(option, function(selection) {
			$scope.frameSelect = selection;
			$scope.history.push('frame');
			$scope.selected = true


		});

		
	}

	$scope.featureSelection = function(option) {
		var selected = document.getElementById(option);
		if (selected.getAttribute('select') == null) {
			selected.setAttribute('select','true')
			selected.style.background = 'blue';
		} else {
			selected.removeAttribute('select')
			selected.style.background = 'green';
		}

	}


});
