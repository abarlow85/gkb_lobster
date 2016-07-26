angular.module('login', [])
  .config(function($interpolateProvider){
    console.log("module");
    $interpolateProvider.startSymbol('[[').endSymbol(']]');

  });
