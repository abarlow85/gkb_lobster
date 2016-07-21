angular.module('gkbInv').controller('inventoryController', function($scope, $location, $window, inventoryFactory){
	$scope.notFound = "";
	$scope.searching = false;
	$scope.archived = false;

	$scope.getItem = function(){
		$scope.archived = false;
		$scope.result = undefined;
		$scope.price = undefined;
		$scope.notFound = "";
		if ($scope.item.sku.length == 12) {
			$scope.searching = true;
			
			inventoryFactory.getItem($scope.item.sku, function(data){
				if (data.status == true) {
					$scope.searching = false;
					result = JSON.parse(data.item)
					$scope.result = result.Item
					$scope.price = $scope.result.Prices.ItemPrice[0].amount
					if ($scope.price == '0') {
						$scope.price = 'Program'
					}
					if ($scope.result.archived == "true") {
						$scope.archived = true;
						
					}
				} else {
					$scope.searching = false;
					$scope.notFound = data.error
				}
			});

		}
	}

	$scope.deleteItem = function(id){
		$scope.deleting = true
		$scope.notFound = "";
		inventoryFactory.deleteItem(id, function(response){
			$scope.deleting = false
			if (response.status == true) {
				$scope.archived = true
			} else {
				$scope.notFound = response.error
			}
		});
	}

});