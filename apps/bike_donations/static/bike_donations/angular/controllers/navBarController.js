angular.module('bikeSelect').controller('navBarController', function($scope, $routeParams, $location, pageService, bikeOptionsFactory){
	$scope.$watch(function(){
		return bikeOptionsFactory.getAssembledBike()
	},function(newValue, oldValue) {
		if (newValue.bikeType != oldValue.bikeType){
			console.log('this would be')
			resetBikeDataValues('all', 'bikeType');
		}  
   		handleBikeValue(newValue)
   	}, true);

	$scope.bikeData = {};

 	var currentParam;
 	var typeArr = pageService.getTypeArr();

 	setBiketype();

   	$scope.$on('$routeChangeSuccess', function() {
   		currentParam = $routeParams.menuItem;
   		$scope.bikeData[currentParam].visited = true;
    	$scope.bikeData[currentParam].current = true;
    	resetBikeDataValues('current',currentParam);
	});



   	function setBiketype(){
	  	for (var i = 0; i < typeArr.length; i++){
	 		$scope.bikeData[typeArr[i]] = {
	  			'skipped': false,
	  			'visited': false
	  		}

	  		if (typeArr[i] == currentParam){
	  			$scope.bikeData[typeArr[i]].current = true;
	  		}else{
	  			true;
	  		}
	  	};
  	}

  	function resetBikeDataValues(value, except){
  		console.log('we are in resetbikedata')
  		for (var data in $scope.bikeData){
  			if (data != except){
  				if(!value || value == 'all'){
  					$scope.bikeData[data].current = false;
  					$scope.bikeData[data].visited = false;
  					if ('item' in $scope.bikeData[data]){
  						delete $scope.bikeData[data].item;
  					}
  				}else{
  					if (value != 'item'){
  						$scope.bikeData[data][value] = false;
  					}else{
  						delete $scope.bikeData[data].item;;
  					}
  				}
  			}
  		}
  	}



   	function grabData(){
   		$scope.bikeData[$routeParams.menuItem].current = true;
   	}

	function handleBikeValue(bike){
		var newTypeArr = Object.keys(bike);
		//sort incoming bike array of select keys according to Nav Bar's order
		//also a good place to re-stuff data
		for (var i = 0; i < newTypeArr.length - 1; i++){
			if(newTypeArr[i] != 'price'){ 
				$scope.bikeData[newTypeArr[i]].item = bike[newTypeArr[i]];
			}else{
				newTypeArr.splice(i, 1)
			}

			var min = i;

			if (newTypeArr[i]){
				if (newTypeArr[i] != 'price' || (newTypeArr[i] == 'features' && $scope.bikeData.features.visited == false)){
					newTypeArr.splice(i,1);
					console.log('we should delete both price and features', newTypeArr)
				}

				for (var iTwo = i + 1; iTwo < newTypeArr.length; iTwo++){
					if (typeArr[iTwo] != 'price' && typeArr.indexOf(newTypeArr[min]) > typeArr.indexOf(newTypeArr[iTwo])){
						min = iTwo;
					}
				}

				if (min != i){
					var temp = newTypArr[min]
					newTypeArr[min] = newTypArr[i];
					newTypeArr[i] = temp;
				}
			}
		}

		if (newTypeArr.length > 0){
			var latestUpdate;
			if (newTypeArr[newTypeArr.length - 1] == 'features' && $scope.bikeData.features.visited == false){
				latestUpdate = newTypeArr[newTypeArr.length - 2]
			}else{
				latestUpdate = newTypeArr[newTypeArr.length - 1];
			}

			if (latestUpdate != 'bikeType'){
				var checkForSkip = newTypeArr[newTypeArr.length - 2];
				if ($scope.bikeData[checkForSkip].visited != true){
				 	$scope.bikeData[checkForSkip].skipped = true;
				};
			}
		}
	}

});