(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope']
function LunchCheckController($scope){


 $scope.checkIfToMuch = function () {

   $scope.sayMessage = function () {

     var stringLunchMenu = $scope.lunchMenu;
     var totalLunchMenu = stringLunchMenu.split(',');
     var totalItens = 0;

      for (var i = 0; i < totalLunchMenu.length; i++)
      {
        
        if (totalLunchMenu[i] != "")
        {
          totalItens++;
          console.log(totalItens);
        }
      }

     if (totalItens === 0)
     {
       return  "Check If Too Much";
     }

    if (totalItens <= 3)
     {
       return  "Enjoy!";
     }

   if (totalItens > 3)
     {
       return "Too much!";
     }
  };

};
}

})();
