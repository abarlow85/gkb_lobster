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
				try {

					$scope.searching = false;
					$scope.result = data;
					$scope.price = data.Prices.ItemPrice[0].amount
					if (data.archived == "true") {
						$scope.archived = true;
						
					}
				} catch (err) {
					$scope.notFound = "This item could not be found"
					$scope.searching = false;
				} 
			});

		}
	}

	$scope.deleteItem = function(id){
		inventoryFactory.deleteItem(id, function(response){

		});
	}

});