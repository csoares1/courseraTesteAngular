(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope){
  $scope.lunchMenu = "";

  $scope.checkIfToMuch = function () {
   var stringLunchMenu = $scope.lunchMenu;
   var totalLunchMenu = stringLunchMenu.split();
   var totalItens = 0;
    console.log(stringLunchMenu);
    console.log(stringLunchMenu);

   //for (var i = 0; i < totalLunchMenu.length; i++)
   //{
    // if (stringLunchMenu[i] <> "")
     //{
       //totalItens++;
      // console.log(totalItens);
     //}
   //}
$scope.sayMessage ="teste";
   //$scope.sayMessage = function (totalItens) {

    // if (totalItens === 0)
    // {
    //   return = "Check If Too Much";
     //}
//
//     if (totalItens >= 3)
  //   {
    //   return = "Enjoy!";
     //}

    /// if (totalItens < 3)
     //{
      // return = "Too much!";
    // }
  // };


}



})();
