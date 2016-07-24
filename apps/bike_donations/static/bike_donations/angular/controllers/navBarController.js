angular.module('bikeSelect').controller('bikeOptionsController', function($scope, $routeParams, $location, pageService, bikeOptionsFactory){
	$scope.$watch(function(){
		return bikeOptionsFactory.getAssembledBike()
	},function(newValue, oldValue) {  
   		handleBikeValue(newValue)
   	}, true);

	$scope.bikeData = {};
   	var typeArr = pageService.getTypeArr();

   	for (var i = 0; i < typeArr.length; i++){
   		$scope.bikeData[typeArr[i]] = {
   			'skipped': false;
   			'visited': false;
   		}

   		if (typeArr[i] == $routeParams.menuItem){
   			$scope.bikeData[typeArr[i]].current = true;
   			$scope.bikeData[typeArr[i]].title = pageService.getBikeTypeHead()
   		}else{
   			true;
   		}
   	};

   	$scope.$watch(function(){
   		return pageService.detectUrl()
   	}function(newValue, oldValue){
   		if ($routeParams.menuItem){
	   		var currentParam = $routeParams.menuItem
	   		if ($scope.bikeData[currentParam].skipped != false){
	   			$scope.bikeData[currentParam].visited = true;
	   			$scope.bikeData[currentParam].current = true;
	   		};
	   	}
   	});

   	function grabData(){
   		$scope.bikeData[$routeParams.menuItem].current = true;
   	}

	function handleBikeValue(bike){
		var newTypeArr = Object.keys(bike);

		//sort incoming bike array of select keys according to Nav Bar's order
		//also a good place to re-stuff data
		for (var i = 0; i < newTypeArr.length - 2; i++){
			var min = i

			for (var iTwo = i + 1; iTwo < newTypeArr.length - 1; iTwo++){
				if (typeArr.indexOf(newTypeArr[min]) > typeArr.indexOf(newTypeArr[iTwo]){
					min = iTwo;
				}
			}

			$scope.bikeData[newTypeArr[i]].item = bike[newTypeArr[i]]

			if (min != i){
				var temp = newTypArr[min]
				newTypeArr[min] = newTypArr[i];
				newTypeArr[i] = temp;
			}
		};
		
		var latestUpdate = newTypeArr[newTypeArr.length - 1];
		if (latestUpdate != 'bikeType'){
			var checkForSkip = newTypeArr[newTypeArr.length - 2];
			if ($scope.bikeData[checkForSkip].visited != true){
				$scope.bikeData[checkForSkip].skipped = true;
			};
		}
	}

});