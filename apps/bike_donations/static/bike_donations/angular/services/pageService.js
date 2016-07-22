angular.module('bikeSelect').service('pageService', function($location, $routeParams){
	var urlInfo = [
		{
			'type': 'bike',
			'path': '/addBike',
			'message': "Add A Bike"
		},{
			'type': 'component',
			'path': '/addComponent',
			'message': "Add A Component"
		},{
			'type': 'other',
			'path': '/find',
			'message': "Find Item in Inventory"
		}
	];

	var typeHead = {
		'bikeType': 'Select a Bike',
		'brand': 'Select a Brand',
		'frame': 'Select a Frame',
		'cosmetic': 'Choose Cosmetic Quality',
		'features': 'Add Features'
	}

	var service = {};
	var headerText;
	var currentUrl;

	service.detectUrl = function(){
		return currentUrl;
	}

	service.getBikeTypeHead = function(){
		return typeHead[$routeParams.menuItem]
	}

	service.menuInput = function(val){
		if (val == 'bikeSelectionSelected'){
			$location.path('/addBike/bikeType')
		}else if(val == 'componentSelectionSelected'){
			$location.path('/addComponent/')
		}
	}

	service.getHeaderText = function(){
		return headerText; 
	}

	service.goToNextBikePartial = function(nextMenuItem){
		var url = '/addBike/' + nextMenuItem
		$location.path(url);
	}

	service.checkBikeTypeUrl = function(url){
		var abStr = '/addBike';

		var trimUrl = url.substring(0, abStr.length)
		if (abStr == trimUrl){
			return true; 
		}

		return false;
	}

	service.determineUrl = function(){
		var urlObj;
		var element;
		var atHome = true;
		currentUrl = $location.url();

		for (var i = 0; i < urlInfo.length; i++){
			urlObj = urlInfo[i];
			element = urlObj['type'];

			if (urlObj.path == '/addBike'){
				if (currentUrl == urlObj.path || currentUrl == urlObj.path + '/'){
					$location.path('/addBike/bikeType');
				}else if (this.checkBikeTypeUrl(currentUrl)){
					if (!($routeParams.menuItem in typeHead)){
						$location.path('/addBike/bikeType');
					}
				}
			}
		}

		
	};

	return service;

});