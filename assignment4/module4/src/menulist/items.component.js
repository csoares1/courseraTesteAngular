(function(){
  'use strict';

  angular.module('Data')
  .component('items',{
    templateUrl:'src/menulist/templates/items.template.html',
    bindings:{
      items:'<'
    }
  })
})();
