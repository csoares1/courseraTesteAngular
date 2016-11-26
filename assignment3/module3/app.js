(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://csoares1.github.io/courseraTesteAngular/assignment3/module3")
.directive('foundItems', NarrowItDownDirective);

function NarrowItDownDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      myTitle: '@warning',
      onRemove: '&'
    },
    controller: NarrowItDownController,
    controllerAs: 'menu',
    bindToController: true
  };

  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;

  menu.title="";

  menu.removeItemMenu = function (itemIndex) {

    MenuSearchService.removeItemMenu(itemIndex);
    menu.items = MenuSearchService.getItems();

  };

  menu.getMatchedMenuItems = function (search) {
  var promise = MenuSearchService.getMenuItens();
  MenuSearchService.limparItems();
  promise.then(function (response) {

  var listMenu = response.data;

  for (var i = 0; i < listMenu.length; i++) {
    var description = listMenu[i].description;
    var name = listMenu[i].name;
    var short_name = listMenu[i].short_name;
    if (description.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
       MenuSearchService.addItem(short_name,name,description);
    }
  };

  menu.items = MenuSearchService.getItems();

  if (menu.items.length === 0){
    menu.countListMenu = false;
    menu.warning = "Nothing found";
  }else{
    menu.countListMenu = true;
      menu.warning = "";
  }

//  MenuSearchService.limparItems();

 })
  .catch(function (error) {
    console.log(error);
  })
};
}
MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  var menu=[];

  service.removeItemMenu = function(index){
    menu.splice(index, 1);
  }

  service.getMenuItens = function () {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });

    return response;
  };


service.addItem = function (short_name,name,description) {
      var item = {
        short_name: short_name,
        name: name,
        description:description
      };
      menu.push(item);
 };

 service.limparItems = function(){
   menu=[];
 }

 service.getItems = function () {
        return menu;
  };
}

})();
