angular.module('login').controller('loginController', function($scope, $window){
  $scope.buttonClicked = function(string){
    if (string == "Staff"){
      $scope.loginSelection = "Staff";
    }
    else if (string == "Volunteer"){
      $scope.loginSelection = "Volunteer";
    }
    else if (string == "Youth"){
      $scope.loginSelection = "Youth";
    }
  }


})
