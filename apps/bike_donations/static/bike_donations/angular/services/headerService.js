angular.module('bikeSelect').service('headerService', function($location){
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

	service.determineUrl = function(callback){
		var urlObj;
		var element;
		var atHome = true;
		console.log(urlInfo)
		for (var i = 0; i < urlInfo.length; i++){
			urlObj = urlInfo[i];
			element = urlObj['type'];

			if (urlObj.path == $location.url()){
				headerText = urlObj.message;
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