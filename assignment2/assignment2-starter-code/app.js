(function () {
  'use strict';

  angular.module('ShoppingListCheckOff',[])
  .controller('ToBuyController',ToBuyController)
  .controller('AlreadyBoughtController',AlreadyBoughtController)
  .service('ShoppingListCheckOffService',ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService){
    var itemsToBuy = this;

    itemsToBuy.shoppingList = ShoppingListCheckOffService.getItems();

    itemsToBuy.boughtItem = function (itemIndex) {
      ShoppingListCheckOffService.boughtItem(itemIndex);
    };

    itemsToBuy.countListBuy = function () {
      if (itemsToBuy.shoppingList.length === 0){
         return true;
      }
     return false;
   };

  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService){
    var itemsBought = this;

    itemsBought.shoppingBought = ShoppingListCheckOffService.getItemsBought();

    itemsBought.countListBought = function () {
    if (itemsBought.shoppingBought.length === 0){
         return true;
    }
    return false;
   };
  }

  function ShoppingListCheckOffService(){
      var service = this;

      // pre List of shopping items to by
      var itemsToBuy = [];

      var itemsBought = [];

      itemsToBuy.push({
      name: "Cookie",
      quantity: "2"
      });
      itemsToBuy.push({
        name: "Apple",
        quantity: "1"
      });
      itemsToBuy.push({
        name: "Potato",
        quantity: "3"
      });
      itemsToBuy.push({
        name: "Banana",
        quantity: "4"
      });
      itemsToBuy.push({
        name:"Chocolate",
        quantity: "1"
      });

      service.Bought = function (itemName, quantity) {
          var item = {
          name: itemName,
          quantity: quantity
         };
        itemsBought.push(item);
      };

      service.boughtItem = function (itemIdex) {
          var item = {
          name: itemsToBuy[itemIdex].name,
          quantity: itemsToBuy[itemIdex].quantity
          };
        //insert in list of bought
         itemsBought.push(item);
        //remove of the list buy
         itemsToBuy.splice(itemIdex, 1);
      };

     service.getItems = function () {
        return itemsToBuy;
      };

      service.getItemsBought = function () {
         return itemsBought;
       };
  }

})();
