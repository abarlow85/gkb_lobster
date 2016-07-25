angular.module('bikeSelect').controller('componentOptionsController', function($scope, $location, $window, componentOptionsFactory, scrollService, boolService){
	$scope.bikeOptions
	$scope.currentPartial = 'category';
	$scope.previousPartial = 'category';

	boolService.forceSelect('component');

	componentOptionsFactory.getAllComponents(function(response){
		console.log('init response')
		console.log(response)
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
	$scope.componentDonation = {};
	$scope.selected = {};
	$scope.selected.quantity = 1;
	$scope.nextButtonAppears = false;
	$scope.nextPartial = "";

	// $scope.$watch('selected.which',function(){
	// 	componentOptionsFactory.clearComponentProduct()
	// 	// $scope.currentPartial = $scope.selected.which
	// 	console.log('printing current partial', $scope.currentPartial);
	// 	var change = function(){
	// 		scrollService.scrollTo('itemSelect')
	// 	}
	//
	// 	if ($scope.selected.which){
	// 		$scope.trim = $scope.selected.which
	// 		setTimeout(change, 20)
	// 	}
	//
	// 	$scope.selected.obj = $scope[$scope.selected.which];
	// });
	$scope.backBtn = function(){

	}

	$scope.selectCategory = function(item){
		$scope.componentDonation['category'] = item; 
		$scope.nextButtonAppears = true;
		$scope.nextPartial = "choiceMade";
		$scope.nextnextPartial = "quantity";
		console.log("donated item", item);
	}

	$scope.selectChoice = function(choice){
		console.log("choice made", choice);
		$scope.componentDonation['choiceMade'] = choice;
		console.log($scope.componentDonation['choiceMade']);
		$scope.componentDonation['price']=$scope.componentDonation['choices'][choice];
		console.log($scope.componentDonation);
		$scope.nextPartial = "quantity";
		$scope.nextButtonAppears = true;

	}

	$scope.nextBtn = function(){
		$scope.nextButtonAppears = false;
		console.log($scope.nextPartial);
		for(key in $scope.componentDonation){
			if (key == $scope.nextPartial){
				$scope.nextButtonAppears = true;
				break;
			}
		}
		$scope.currentPartial = $scope.nextPartial;

		console.log($scope.componentDonation);

	}

	// $scope.$watch('selected.item',function(){
	// 	var scope_array = [$scope.selected.which, $scope.selected.item, $scope.selected.obj];
	// 	var typeArr = ['category', 'item', 'price'];
	//
	// 	var info = {};
	//
	// 	for(var idx = 0; idx < typeArr.length; idx++){
	// 		if (scope_array[idx] && idx < typeArr.length - 1){
	// 			info[typeArr[idx]] = scope_array[idx];
	// 		}else if (scope_array[idx]){
	// 			info[typeArr[idx]] = Number($scope.selected.obj[$scope.selected.item])
	// 		}
	// 	}
	//
	// 	componentOptionsFactory.createComponentProduct(info);
	//
	// });

	$scope.postComponent = function(){
		if ($scope.selected.quantity && $scope.selected.quantity <=20 && $scope.selected.quantity > 0){
			$scope.posting = true
			$scope.error = false

			componentOptionsFactory.sendComponentToServer($scope.selected.quantity, function(response){
				console.log(response);
				if (response.status == true) {
					$window.location = "/print/"
				} else {
					$scope.error = response.error
				}
			});
		}else{
			console.log("quantity exceeded");
		}

	}
});
