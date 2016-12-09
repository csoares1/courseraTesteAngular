(function() {
"use strict";

angular.module('common')
.service('SignUpService', SignUpService);

SignUpService.$inject=['$http','ApiPath','$q', '$timeout'];
function SignUpService($http,ApiPath,$q, $timeout){
  var service= this;
  var items=[];


  service.getDishFavorite=function(shortName){
    return $http.get(ApiPath +'/menu_items/'+ shortName+'.json' ).then(function(respose){
      return respose.data;
    });
  };

  service.limparItems = function(){
  items=[];
}

  service.addItem = function (short_name,name,description) {
    var  item = {
        short_name: short_name,
        name: name,
        description:description
      };
      items.push(item);
 };

 service.removeItem = function(index){
    items.splice(index, 1);
  }

 service.getItems = function () {
         return items;
   };


}

})();
