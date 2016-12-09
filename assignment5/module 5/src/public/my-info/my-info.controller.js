(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', SignUpController);

SignUpController.$inject = ['$scope','CurrentUserService'];
function SignUpController($scope,CurrentUserService) {

  $scope.firstname = CurrentUserService.getFirstname();
  $scope.lastname = CurrentUserService.getLastname();
  $scope.phone = CurrentUserService.getPhone();
  $scope.email = CurrentUserService.getEmail();
  $scope.list = CurrentUserService.getList();

  if ($scope.firstname !== '' && $scope.lastname !== '' && $scope.phone !== '' && $scope.email !== '')
  {
       $scope.completed = true;
       $scope.incompleted = false;
  }else {
      $scope.incompleted = true
       $scope.completed = false;
  }

 }
})();
