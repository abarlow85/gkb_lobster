angular.module('gkbInv', [])
	.config(function($interpolateProvider) {

		$interpolateProvider.startSymbol('[[').endSymbol(']]');
	});