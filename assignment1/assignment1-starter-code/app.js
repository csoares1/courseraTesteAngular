(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope']
function LunchCheckController($scope){

  $scope.lunchMenu = '';
  $scope.statusLunch = false;

  $scope.limparMessage = function(){
      if(  $scope.statusLunch === true) {
        $scope.statusLunch = false;    
          $scope.sayMessage = function () {
            return "";
         }
      }
  }

  $scope.checkIfToMuch = function() {

    $scope.statusLunch = true;

    $scope.sayMessage = function () {

        var stringLunchMenu = $scope.lunchMenu;

        if (stringLunchMenu !== undefined){

          var totalLunchMenu = stringLunchMenu.split(',');
          var totalItens = 0;

           for (var i = 0; i < totalLunchMenu.length; i++)
           {

             if (totalLunchMenu[i].trim() !== "")
             {
               totalItens++;

             }
           }

          if (totalItens === 0)
          {
           $scope.corMessage = "corRed";

            return  "Please enter data first";
          }

         if (totalItens <= 3)
          {
           $scope.corMessage = "corGreen";

            return  "Enjoy!";
          }

        if (totalItens > 3)
          {
           $scope.corMessage = "corGreen";

            return "Too much!";
          }
        }else{
             $scope.corMessage = "corRed";
             return  "Please enter data first";
        }

     };
  };
}

})();
