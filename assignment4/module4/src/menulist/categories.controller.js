(function(){
  'use strict';

  angular.module('Data')
  .controller('CategoriesController',CategoriesController);

  CategoriesController.$inject=['MenuDataService','items'];

  function CategoriesController(menuDataService,items){

    var categories=this;
    categories.items=items.data;
  }

})();
