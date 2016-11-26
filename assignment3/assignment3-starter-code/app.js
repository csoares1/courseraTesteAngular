(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
.directive('founditems', NarrowItDownDirective);

function NarrowItDownDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<'
    },
    controller: NarrowItDownController,
    controllerAs: 'menu',
    bindToController: true,
    transclude: true
  };

  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;

  menu.title="";
  var promise = MenuSearchService.getMenuItens();
  promise.then(function (response) {
    menu.items = response.data["menu_items"] ;

    if (menu.items.length === 0){
        menu.countListMenu = false;
    }else{
        menu.countListMenu = true;
    }

  })
  .catch(function (error) {
    console.log("Something went terribly wrong.");
  });

  menu.removeItemMenu = function (itemIndex) {
    MenuSearchService.removeItemMenu(itemIndex);
    menu.items = MenuSearchService.getItems();

  };

  menu.logMenuSearch = function (search) {
  var promise = MenuSearchService.getMenuForSearch(search);

  promise.then(function (response) {

  var listMenu = response.data["menu_items"];

  for (var i = 0; i < listMenu.length; i++) {
    var description = listMenu[i].description;
    var name = listMenu[i].name;
    var short_name = listMenu[i].short_name;
    if (description.toLowerCase().indexOf(search) !== -1) {
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

  MenuSearchService.limparItems();

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

  service.getMenuCategories = function () {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/categories.json")
    });

    return response;
  };

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

  service.getMenuForSearch = function (search) {

  var response = $http({
    method: "GET",
    url: (ApiBasePath + "/menu_items.json"),
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
