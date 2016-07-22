angular.module('bikeSelect').controller('bikeOptionsController', function($scope, $routeParams, $location, pageService, $window, bikeOptionsFactory, scrollService, boolService){
	$scope.bikeType = {};
	$scope.features = [];
	$scope.assembled_bike = {};
	$scope.menuData = {};
	$scope.noFuture = true;
	var nextPath;
	var backPath

	$scope.currentSelect = $routeParams.menuItem;
	$scope.subHeaderText = pageService.getBikeTypeHead();
	bikeOptionsFactory.somethingVisitedAlsoAvailable($scope.currentSelect)

	if ($scope.currentSelect == 'bikeType' && bikeOptionsFactory.isBikeNovel()){
		bikeOptionsFactory.selectionData(function(data){
			for (var key in data){
				$scope.menuData[key] = data[key].status
			}
		});
	}else{
		console.log('WE ARE IN BIKE OPTIONS FACTORY')
		$scope.havePast = true;

		var timelineInfo = bikeOptionsFactory.pastAndIfFuture($scope.currentSelect, function(info){
			if ('past' in info){
				backPath = info.past;
			}else{
				$scope.havePast = false;
			}

			console.log('THIS IS Our INFO',info)

			if ('next' in info){
				$scope.noFuture = false;
				console.log(info.next)
				nextPath = info.next;
			}
		});

		console.log('HEED CURRENT SELECT', $scope.currentSelect)

		var prep = bikeOptionsFactory.receivePrepScope($scope.currentSelect)
		console.log(prep)
		if (!prep || Object.keys(prep).length < 1){
			$location.path('/addBike/bikeType');
		}else{
			$scope.menuData = prep;
		}
	}

	$scope.itemSelected = function(item){
		$scope.selected[$scope.currentSelect] = item;
		$scope.menuData[item] = true;
		for (var obj in $scope.menuData){
			if (obj != item){
				console.log(obj)
				$scope.menuData[obj] = false;
			}
		}
		console.log($scope.menuData)
		bikeOptionsFactory.valueSelect($scope.currentSelect, item);
		if ($scope.currentSelect != 'features'){
			nextPath = bikeOptionsFactory.assembleScope($scope.currentSelect);
		}else{
			console.log('we are not a future')
		}
		$scope.noFuture = false;
	}

	$scope.goToNext = function(){
		if (nextPath){
			console.log('next path', nextPath)
			$location.path('addBike/' + nextPath)
		}else{
			console.log('WHAT NO NEXT')
		}
	}

	$scope.goToPast = function(){
		$location.path('addBike/' + backPath)
	}
	$scope.selected = {};
	$scope.selected.quantity = 1;


	$scope.checkbox = function(item){

		bikeOptionsFactory.valueSelect("features", item);
		bikeOptionsFactory.assembleBike(function(bike){
			$scope.assembled_bike=bike;
		});

	};

	$scope.getBike = function(){
		if ($scope.selected.quantity && $scope.selected.quantity <= 20 && $scope.selected.quantity > 0){
			$scope.posted = true;
			$scope.error = false;

			bikeOptionsFactory.assembleBike(function(bike){
				$scope.bike_info = bike;
				$scope.bike_info["quantity"] = $scope.selected.quantity;
				bikeOptionsFactory.postBike(bike, function(data){
					$scope.error = data;
					console.log(data);
				})
			});
		}
		else{
			console.log("quantity exceeds");
		}
	};

	$scope.goBack = function(){
		$window.location = "/"
	}

	$scope.confirm = function(){
		console.log("going to confirm");
		bikeOptionsFactory.assembleBike(function(bike){
			$scope.assembled_bike=bike;
			$scope.posted = false;
		});
		$scope.checkBike = true;
	}

});
