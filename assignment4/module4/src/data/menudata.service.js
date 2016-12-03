(function(){
  'use strict';

   angular.module('Data')
   .service('MenuDataService',MenuDataService)
   .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

   MenuDataService.$inject = ['$http', 'ApiBasePath','$q', '$timeout']
   function MenuDataService($http,ApiBasePath,$q, $timeout){
     var service=this;
     var items=[];
     items = $http({
      method: "GET",
      url: (ApiBasePath + "/categories.json")
      });
      var menu_items=[];

     service.getAllCategories = function(){
       var deferred = $q.defer();

        // Wait 2 seconds before returning
        $timeout(function () {
          // deferred.reject(items);
          deferred.resolve(items);
        }, 800);

        return deferred.promise;
      };

      service.getItemsForCategory = function(shortName){
        var deferredItems = $q.defer();

        menu_items = $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json"),
        params: {
          category: shortName
        }});

        // Wait 2 seconds before returning
        $timeout(function () {
          // deferred.reject(items);
          deferredItems.resolve(menu_items);
        }, 800);

        return deferredItems.promise;
          };

   }
})();
