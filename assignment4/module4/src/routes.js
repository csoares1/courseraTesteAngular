(function (){
  'use strict'

  angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {

    // Redirect to tab 1 if no other URL matches
    $urlRouterProvider.otherwise('/');

    // Set up UI states
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'src/menulist/templates/home.template.html'
      })

      .state('categories', {
        url: '/categories',
        templateUrl: 'src/menulist/templates/categories.template.html',
        controller:'CategoriesController as categories',
        resolve:{
          items:['MenuDataService', function(MenuDataService){
            return MenuDataService.getAllCategories();
          }]
        }
      })

      .state('items', {
        url: '/items/{shortName}',
        templateUrl: 'src/menulist/templates/items.template.html',
        controller:'ItemsController as item',
        resolve:{
          items:['$stateParams','MenuDataService', function($stateParams,MenuDataService){
              return MenuDataService.getItemsForCategory($stateParams.shortName);
            }]
          }
      });

      //.state('categories.items', {
      //  url: '/items',
      //  templateUrl: 'src/menulist/templates/home.template.html'
      //  controller:'ItemsController as items',
      //  controller:'CategoriesController as categories',
      //  resolve:{
        //  items:['MenuDataService', function(MenuDataService){
          //  return MenuDataService.getAllCategories();
        //  }]
      //  }
      //  controller:'CategoriesController as categories',
      //  resolve:{
      //    items:['MenuDataService', function(MenuDataService){
      //      return MenuDataService.getAllCategories();
      //    }]
      //  }
      //})
      ;
  }

})();
