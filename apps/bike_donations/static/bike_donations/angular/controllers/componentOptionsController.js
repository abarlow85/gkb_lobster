angular.module('bikeSelect').controller('componentOptionsController', function($scope, $location, $window, componentOptionsFactory, scrollService, boolService){


	var location = document.getElementById('controllerSelect')
	if (location.getAttribute('ng-controller') == 'bikeOptionsController') {
		$location.path('/addBike');
	} else {
		$location.path('/addComponent');
	}

	$scope.partials = ['category', 'item', 'quantity', 'confirmation']
	$scope.which = [];
	$scope.bikeOptions
	$scope.currentPartial = $scope.partials[0];
	$scope.formIndex = 0;
	$scope.componentDonation = {};
	$scope.selected = {};
	$scope.selected.quantity = 1;
	$scope.nextButtonAppears = false;

	$scope.selectionTitles = {
		'category': "Select a Category",
		'item' : "Select an Item",
		'quantity' : "Select the quantity you are checking in",
		'confirmation' : "Please review your selections"
	}
	$scope.title = $scope.selectionTitles['category'];


	boolService.forceSelect('component');

	componentOptionsFactory.getAllComponents(function(response){
		 $scope.x = response
		for (var obj in response){
			$scope.which.push(obj)

			$scope[obj] = {};

			for (var index = 0; index < response[obj].length; index++){
				var catItemObj = response[obj][index];
				var itemName = catItemObj['item'];
				var itemPrice = catItemObj['price'];
				$scope[obj][itemName] = itemPrice;
			}
		}
	});

	$scope.backBtn = function(){
		$scope.nextButtonAppears = true;
		$scope.formIndex--;
		$scope.currentPartial = $scope.partials[$scope.formIndex];
		$scope.title = $scope.selectionTitles[$scope.currentPartial];
	}

	$scope.doneBtn = function(){
		componentOptionsFactory.createComponentProduct($scope.componentDonation);
		if(!$scope.editing){
			$scope.formIndex++;
			$scope.currentPartial = $scope.partials[$scope.formIndex];
		}
		else {
			$scope.currentPartial = 'confirmation';
		}
		$scope.title = $scope.selectionTitles[$scope.currentPartial];
	}

	$scope.editJump = function(option){
		$scope.editing = true;
		$scope.currentPartial = option;
		$scope.title = $scope.selectionTitles[$scope.currentPartial];
	}

	$scope.restart = function(){
		$window.location = '/';
	}
	$scope.selectCategory = function(item){
		$scope.componentDonation['category'] = item;
		$scope.componentDonation['choices'] = $scope[item];
		$scope.nextButtonAppears = true;
		$scope.componentDonation.item = null;
		$scope.componentDonation.quantity = null;

	}

	$scope.selectChoice = function(choice){
		$scope.componentDonation['item'] = choice;
		$scope.nextButtonAppears = true;
	}

	$scope.nextBtn = function(){
		$scope.nextButtonAppears = false;
		for(key in $scope.componentDonation){
			if (key == $scope.partials[$scope.formIndex + 1] && $scope.componentDonation[key] != null){
				$scope.nextButtonAppears = true;
				break;
			}
		}
		$scope.formIndex++;
		$scope.currentPartial = $scope.partials[$scope.formIndex];
		$scope.title = $scope.selectionTitles[$scope.currentPartial];
	}

	$scope.sideBarStatus = function(status) {
		$scope.sideNavStatusComp = status;
	}

	$scope.postComponent = function(){
		$scope.posted = true;
		$scope.error = false;
		componentOptionsFactory.sendComponentToServer(function(response){
			$scope.posted = false;
			if (response.status == true) {
				$window.location = "/print/"
			} else {
				$scope.error = response.error
			}
		})
	};

});
