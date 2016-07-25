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
				$scope.remainingOptions = $scope.linkRemainingOptions(Object.keys(nextOptions));
				$scope.history = []
				$scope.selected = true
				$scope.bikeObject[$scope.nextName] = selection
			
			// console.log($scope.allOptions)
			
		});
	}

	$scope.linkRemainingOptions = function(options) {
		var linkedList = {

			'bikeType' : { prev: null, next: options[0] }

		};

		for (var i = 0; i < options.length; i++) {
			if (i == 0) {
				console.log(options[i]);
				linkedList[options[i]] = {prev:'bikeType', next: options[i+1] == undefined ? null : options[i+1] };
			} else {
				linkedList[options[i]] = {prev:options[i-1], next: options[i+1] == undefined ? null : options[i+1] };
			}
		}

		return linkedList;


	}

	$scope.nextBtn = function(){
		console.log("NEXT")

		$scope.selected = false
		var nextOpt = $scope.remainingOptions[$scope.nextName].next;
		// $scope.history.push($scope.nextName);
		// console.log($scope.remainingOptions);
		$scope.nextOptions = $scope.allOptions[nextOpt];
		$scope.nextName = nextOpt;

		// for (var idx in $scope.remainingOptions) {
		// 	var value = $scope.remainingOptions[idx]
		// 	$scope.nextOptions = $scope.allOptions[value];
		// 	$scope.nextName = value;
		// 	$scope.remainingOptions.splice(0,1);
		// 	break;
		// }

		if ($scope.remainingOptions[$scope.nextName].next == null) {
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
		var prev = $scope.remainingOptions[$scope.nextName].prev
		$scope.complete = false
		$scope.selected = true
		// $scope.remainingOptions.unshift($scope.nextName);
		$scope.nextOptions = $scope.allOptions[prev];
		$scope.nextName = prev;
		console.log("BACK")
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
