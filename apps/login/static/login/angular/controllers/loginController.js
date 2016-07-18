angular.module('login').controller('loginController', function($scope, $window){
  console.log("loginSelection", $scope.loginSelection);
  $scope.secretWord = "";
  $scope.buttonClicked = function(string){
    console.log("button clicked", string);
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
  $scope.verify=function(secret){
    console.log("Secret", $scope.secretWord)
    console.log($scope.loginSelection);
  }

})
