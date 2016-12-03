(function () {
'use strict';

angular.module('Data')
.controller('ItemsController', ItemsController);

ItemsController.$inject = ['MenuDataService','items'];

function ItemsController(MenuDataService, items) {
  
  var item = this;
  item.menu_items = items.data.menu_items;
}

})();
