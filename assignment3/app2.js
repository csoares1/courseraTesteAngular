Skip to content
Personal Open source Business Explore
Sign upSign inPricingBlogSupport
This repository
Search
 Watch 1  Star 0  Fork 458 waverim/fullstack-course5
forked from jhu-ep-coursera/fullstack-course5
 Code  Pull requests 0  Projects 0  Pulse  Graphs
Branch: master Find file Copy pathfullstack-course5/assignments/assignment3/assignment3-starter-code/js/app.js
59e3eca  4 hours ago
@waverim waverim assignment3
1 contributor
RawBlameHistory
76 lines (64 sloc)  1.81 KB
(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', foundItemsDirective);

function foundItemsDirective () {
    var ddo = {
        templateUrl: './foundItems.html',
        scope: {
            items: '<',
            onRemove: '&'
        },
        controller: MenuItemsDirectiveController,
        controllerAs: 'list',
        bindToController: true
    }

    return ddo;
}

function MenuItemsDirectiveController () {
    var list = this;

    list.isEmpty = function () {
        if (list.items === undefined) {
            return 1;
        } else {
            return list.items.length;
        }
    }
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
    var narrow = this;
    narrow.items;
    narrow.searchInput = "";

    narrow.menuSearch = function () {
        MenuSearchService
        .getMatchedMenuItems(narrow.searchInput)
        .then(function (items) {
            narrow.items = items;
        })
    }

    narrow.removeItem = function (index) {
        narrow.items.splice(index, 1);
    }
}

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
        return $http({
            method: 'GET',
            url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
        }).then(function (result) {
            if (searchTerm.length === 0) {
                return [];
            } else {
                return result.data.menu_items.filter(function (elem, index) {
                    return elem.description.indexOf(searchTerm) >= 0;
                });
            }
        });
    };
}

})();
Contact GitHub API Training Shop Blog About
© 2016 GitHub, Inc. Terms Privacy Security Status Help
