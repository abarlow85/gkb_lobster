angular.module('bikeSelect').controller('BikesController', function($scope, $location, $window, BikeFactory){

	var location = document.getElementById('controllerSelect')
	if (location.getAttribute('ng-controller') == 'BikesController') {
		$location.path('/addBike');
	} else {
		$location.path('/addComponent');
	}

	$scope.nextName = 'bikeType'

	$scope.selectionTitles = {
		'bikeType': "Select a Model",
		'brand' : "Select a Brand",
		'cosmetic': "Select a Condition",
		'frame': "Select a Frame",
		'features' : "Select all features that apply",
		'quantity' : "Select the quantity you are checking in",
		'confirm' : "Please review your selections"
	}

	$scope.title = $scope.selectionTitles[$scope.nextName]

	BikeFactory.selectionData(function(data){
		$scope.bikeType = data
	});

	$scope.sideBarStatus = function(status) {
		$scope.sideNavStatus = status;
	}

	$scope.addBikeType = function(option){
		$scope.bikeObject = {};
		$scope.typeSelect = '';
		$scope.brandSelect = '';
		$scope.cosmeticSelect = '';
		$scope.frameSelect = '';
		$scope.featuresSelect = [];

		$scope.featuresVisited = false;

		BikeFactory.addBikeType(option, function(selection, nextOptions) {

				$scope.typeSelect = selection;
				$scope.allOptions = JSON.parse(JSON.stringify(nextOptions));
				$scope.remainingOptions = $scope.linkRemainingOptions(Object.keys(nextOptions));
				$scope.history = []
				$scope.selected = true
				$scope.bikeObject[$scope.nextName] = selection
				// $scope.nextBtn()

		});
	}

	$scope.linkRemainingOptions = function(options) {
		var linkedList = {

			'bikeType' : { prev: null, next: options[0] }

		};

		for (var i = 0; i < options.length; i++) {
			if (i == 0) {
				linkedList[options[i]] = {prev:'bikeType', next: options[i+1] == undefined ? null : options[i+1] };
			} else {
				linkedList[options[i]] = {prev:options[i-1], next: options[i+1] == undefined ? null : options[i+1] };
			}
		}

		return linkedList;


	}

	$scope.nextBtn = function(){
		$scope.selected = false
		var nextOpt = $scope.remainingOptions[$scope.nextName].next;
		$scope.nextOptions = $scope.allOptions[nextOpt];
		$scope.nextName = nextOpt;

		if ($scope.remainingOptions[$scope.nextName].next == null) {
			$scope.complete = true
		}
		for (key in $scope.bikeObject) {
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

		$scope.title = $scope.selectionTitles[$scope.nextName]
	}

	$scope.backBtn = function() {
		var prev = $scope.remainingOptions[$scope.nextName].prev
		$scope.complete = false
		$scope.selected = true
		$scope.nextOptions = $scope.allOptions[prev];
		$scope.nextName = prev;
		$scope.title = $scope.selectionTitles[$scope.nextName]
	}

	$scope.editJump = function(option) {
		$scope.editing = true
		$scope.nextOptions = $scope.allOptions[option];
		$scope.nextName = option;
	}

	$scope.restart = function() {
		$window.location = '/'
	}

	$scope.brandSelection = function(option) {
		BikeFactory.brandSelection(option, function(selection) {
			$scope.brandSelect = selection;
			$scope.selected = true
			$scope.bikeObject[$scope.nextName] = selection
			// $scope.nextBtn();
		});
	}

	$scope.cosmeticSelection = function(option) {
		BikeFactory.cosmeticSelection(option, function(selection) {
			$scope.cosmeticSelect = selection;
			$scope.selected = true
			$scope.bikeObject[$scope.nextName] = selection
			// $scope.nextBtn();

		});
	}

	$scope.frameSelection = function(option) {
		BikeFactory.frameSelection(option, function(selection) {
			$scope.frameSelect = selection;
			$scope.selected = true
			$scope.bikeObject[$scope.nextName] = selection
			// $scope.nextBtn();
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


	}

	$scope.isInSelections = function(option) {
		return $scope.featuresSelect.indexOf(option) != -1
	}

	$scope.doneBtn = function() {

		$scope.bikeObject['features'] = $scope.featuresSelect;

		BikeFactory.completeBike($scope.bikeObject, function(bike) {
			$scope.history.push('features');
			$scope.confirmBike = bike;
			$scope.nextName = 'confirm';
			$scope.title = $scope.selectionTitles[$scope.nextName]
		});
	}

	$scope.postBike = function() {
		$scope.posted = true;
		BikeFactory.postBike(function(response){
			$scope.posted = false;
			$scope.error = response;
		});
	}


});
