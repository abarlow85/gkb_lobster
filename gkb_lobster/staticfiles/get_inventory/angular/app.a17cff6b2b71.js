angular.module('gkbInv', [])
	.config(function($interpolateProvider, $httpProvider) {

		$interpolateProvider.startSymbol('[[').endSymbol(']]');
		$httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

	});