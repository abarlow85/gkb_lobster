angular.module('bikeSelect').controller('componentOptionsController', function($scope, $location, $window, componentOptionsFactory, scrollService, boolService){
	$scope.which = [];
	$scope.bikeOptions
	componentOptionsFactory.getAllComponents(function(response){
		console.log('init response')
		console.log(response)
		for (var obj in response){
			$scope.which.push(obj)
			$scope[obj] = {};
			for (var index = 0; index < response[obj].length; index++){
				var catItemObj = response[obj][index];
				var itemName = catItemObj['item'];
				var itemPrice = catItemObj['price'];
				console.log ("printing catItemObj", catItemObj);
				$scope[obj][itemName] = itemPrice;
			}
		}
	});
	
	$scope.selected = {};

	$scope.$watch('selected.which',function(){
		componentOptionsFactory.clearComponentProduct()
		console.log('change')
		var change = function(){
			scrollService.scrollTo('itemSelect')
		}

		if ($scope.selected.which){
			$scope.trim = $scope.selected.which
			setTimeout(change, 20)
		}

		$scope.selected.obj = $scope[$scope.selected.which];
	});

	$scope.$watch('selected.item',function(){
		var scope_array = [$scope.selected.which, $scope.selected.item, $scope.selected.obj];
		var typeArr = ['type', 'item', 'price'];
		var info = {};

		for(var idx = 0; idx < typeArr.length; idx++){
			if (scope_array[idx] && idx < typeArr.length - 1){
				info[typeArr[idx]] = scope_array[idx];
			}else{
				info[typeArr[idx]] = $scope.selected.obj[$scope.selected.item]
			}
		}
		
		componentOptionsFactory.createComponentProduct(info);	

	});

	$scope.postComponent = function(){
		$scope.posting = true
				
		
		// console.log(selected.item);
		componentOptionsFactory.sendComponentToServer(function(response){
			// if (response.success){
			// 	$window.location = "/print/"
			// }
			console.log(response);
		});

	}
});