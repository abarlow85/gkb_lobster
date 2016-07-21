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

	var service = {};
	var headerText;

	service.getHeaderText = function(){
		return headerText; 
	}

	service.goToNextBikePartial = function(menuItem){
		var url = '/addBike/' + menuItem
		$location.path(url)
	}

	service.checkBikeTypeUrl = function(url){
		var abStr = '/addBike'

		var trimUrl = url.substring(0, abStr.length)
		if (abStr == trimUrl){
			return true 
		}

		return false
	}

	service.determineUrl = function(callback){
		var urlObj;
		var element;
		var atHome = true;
		var currentUrl = $location.url()

		for (var i = 0; i < urlInfo.length; i++){
			urlObj = urlInfo[i];
			element = urlObj['type'];

			if (urlObj.path == currentUrl && urlObj.path != '/addBike'){
				headerText = urlObj.message;
				document.getElementById(element).disabled = true;

				atHome = false;
			}else if (urlObj.path == '/addBike')
				if (currentUrl == urlObj.path || currentUrl == urlObj.path + '/'){
					$location.path('/addBike/bikeType')
				}else if (this.checkBikeTypeUrl(currentUrl)){
					headerText = urlObj.message
					document.getElementById(element).disabled = true;

					atHome = false;
			}else{
				document.getElementById(element).disabled = false;
			}
		}

		if (atHome){
			headerText = "Add To Inventory"
		}

		callback(headerText)
	}

	return service

});