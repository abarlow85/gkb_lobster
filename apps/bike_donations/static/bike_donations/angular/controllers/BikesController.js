angular.module('bikeSelect').controller('BikesController', function($scope, $location, $window, BikeFactory){
	
	var location = document.getElementById('controllerSelect')
	if (location.getAttribute('ng-controller') == 'BikesController') {
		$location.path('/addBike');
	} else {
		$location.path('/addComponent');
	}

	$scope.nextName = 'bikeType'

	BikeFactory.selectionData(function(data){
		$scope.bikeType = data
	});

	$scope.sideBarStatus = function(status) {
		$scope.sideNavStatus = status;
		console.log(status);
	}

	$scope.addBikeType = function(option){
		$scope.bikeObject = {};
		$scope.typeSelect = ''
		$scope.brandSelect = ''
		$scope.cosmeticSelect = ''
		$scope.frameSelect = ''
		$scope.featuresSelect = []

		BikeFactory.addBikeType(option, function(selection, nextOptions) {
			
				$scope.typeSelect = selection;
				$scope.allOptions = JSON.parse(JSON.stringify(nextOptions));
				$scope.remainingOptions = Object.keys(nextOptions)
				$scope.history = []
				$scope.selected = true
				$scope.bikeObject[$scope.nextName] = selection
			
			// console.log($scope.allOptions)
			
		});
	}

	$scope.nextBtn = function(){
		console.log("NEXT")

		$scope.selected = false
		$scope.history.push($scope.nextName);
		console.log($scope.remainingOptions);
		for (var idx in $scope.remainingOptions) {
			var value = $scope.remainingOptions[idx]
			$scope.nextOptions = $scope.allOptions[value];
			$scope.nextName = value;
			$scope.remainingOptions.splice(0,1);
			break;
		}

		if ($scope.remainingOptions.length == 0) {
			$scope.complete = true
		}
		for (key in $scope.bikeObject) {
			// console.log(key)
			if (key == $scope.nextName) {
				$scope.selected = true
				break;
			}
		}

		if ($scope.nextName == 'features') {
			$scope.selected = true;
		}

		if ($scope.nextName == 'quantity') {

			$scope.featuresVisited = true;
			$scope.selected = false;
		}
		
		console.log($scope.nextName)
		
		
	}

	$scope.backBtn = function() {
		$scope.complete = false
		$scope.selected = true
		$scope.remainingOptions.unshift($scope.nextName);
		$scope.nextName = $scope.history.pop();
		$scope.nextOptions = $scope.allOptions[$scope.nextName];
		console.log("BACK")
		console.log($scope.history);
		console.log($scope.remainingOptions)
	}

	$scope.brandSelection = function(option) {
		BikeFactory.brandSelection(option, function(selection) {
			$scope.brandSelect = selection;
			$scope.selected = true
			$scope.bikeObject[$scope.nextName] = selection
		});

		
	}

	$scope.cosmeticSelection = function(option) {
		BikeFactory.cosmeticSelection(option, function(selection) {
			$scope.cosmeticSelect = selection;
			$scope.selected = true
			$scope.bikeObject[$scope.nextName] = selection

		});

		
	}

	$scope.frameSelection = function(option) {
		BikeFactory.frameSelection(option, function(selection) {
			$scope.frameSelect = selection;
			$scope.selected = true
			$scope.bikeObject[$scope.nextName] = selection


		});

		
	}

	$scope.featureSelection = function(option) {

		if (!$scope.featuresVisited) {
			$scope.featuresVisited = true
		}
		var optionAlreadySelected = false;
		for (var idx in $scope.featuresSelect) {
			if ($scope.featuresSelect[idx] == option) {
				$scope.featuresSelect.splice($scope.featuresSelect.indexOf(option), 1);
				optionAlreadySelected = true;

			}
		}
		if (!optionAlreadySelected) {
			$scope.featuresSelect.push(option);
		}

		console.log($scope.featuresSelect);


	}

	$scope.isInSelections = function(option) {
		return $scope.featuresSelect.indexOf(option) != -1
	}

	$scope.doneBtn = function() {

		$scope.bikeObject['features'] = $scope.featuresSelect;
		console.log($scope.bikeObject.quantity);
		
		BikeFactory.completeBike($scope.bikeObject, function(bike) {
			$scope.history.push('features');
			$scope.confirmBike = bike;
			$scope.nextName = 'confirm';
		});
	}

	$scope.postBike = function() {
		BikeFactory.postBike(function(response){
			$scope.error = response;
		});
	}


});
