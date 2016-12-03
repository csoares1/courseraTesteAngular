(function(){
  'use strict';
  
  angular.module('Data')
  .component('categories',{
    templateUrl:'src/menulist/templates/categories.template.html',
    bindings:{
      items:'<'
    }
  })
})();
