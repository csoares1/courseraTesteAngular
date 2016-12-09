(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

function verifyNullEmpty(string) {
  var retorno = false;

  if (string === undefined){
    retorno = true;
  }
  if (string === ""){
    retorno = true;
  }

  return retorno;
}

SignUpController.$inject = ['SignUpService','CurrentUserService','$filter'];
function SignUpController(SignUpService,CurrentUserService,$filter) {

  var $ctrl = this;
  $ctrl.firstname = '';
  $ctrl.lastname = '';
  $ctrl.phone = '';
  $ctrl.email = '';
  $ctrl.menunumber = '';
  $ctrl.success = '';
  $ctrl.error = '';
  $ctrl.list = [];
  SignUpService.limparItems();

  $ctrl.submit = function () {

    var completed = CurrentUserService.saveFavorites($ctrl.firstname, $ctrl.lastname,$ctrl.email,$ctrl.phone, $ctrl.list);
    if (completed === true){
          $ctrl.success = "Your information has been saved";
    }else{
          $ctrl.error = "Sig-Up Failed";
    };
  };

  $ctrl.invalid = function() {
    if(verifyNullEmpty($ctrl.menunumber) === true){
     return (true);
   }else if (verifyNullEmpty($ctrl.menunumbererror) === false){
     return(true);
   }else{
      return(false);
   }
  };

  $ctrl.removeItem=function(index){
    SignUpService.removeItem(index);
    $ctrl.list = SignUpService.getItems();
    if ($ctrl.list.length === 0){
      $ctrl.menunumber = "";
      $ctrl.menunumbererror = "Please, specify the menu number that's their favorite dish";
    }
  }

  $ctrl.submitFavorites= function () {
    if(verifyNullEmpty($ctrl.menunumber) === false ){
        var upCase = $filter('uppercase');
        var promise =   SignUpService.getDishFavorite(upCase($ctrl.menunumber));
        promise.then(function (response) {
            SignUpService.addItem(response.short_name,response.name,response.description);
            $ctrl.list = SignUpService.getItems();
            $ctrl.menunumbererror = "";
        })
        .catch(function (error) {
          console.log(error);
          $ctrl.menunumbererror = "No such menu number exists";
        })

     }else{
         $ctrl.menunumbererror = "Please, specify the menu number that's their favorite dish";
     }
 };
}

})();
