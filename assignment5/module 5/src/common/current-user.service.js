(function() {
"use strict";

angular.module('common')
.service('CurrentUserService', CurrentUserService);

function CurrentUserService(){
  var service= this;
  var _firstname='';
  var _lastname='';
  var _phone ='';
  var _email='';
  var _shortname='';
  var _name = '';
  var _description = '';
  var _list = '';

  service.saveFavorites=function(firstname,lastname,email,phone,list){
    var returnSave = false;
       _firstname=firstname;
       _lastname=lastname;
       _phone=phone;
       _email=email;
       _list = list;
       returnSave = true;

   return returnSave;
  };

  service.limparItems = function(){
  _list=[];
}

  service.getFirstname = function() {
    return _firstname;
  };

  service.getLastname = function() {
    return _lastname;
  };

  service.getPhone = function() {
    return _phone;
  };

  service.getEmail = function() {
    return _email;
  };

  service.getShortname = function() {
    return _shortname;
  };

  service.getName = function(){
    return _name;
  };

  service.getDescription = function(){
    return _description;
  };

  service.getList = function(){
    return _list;
  }

}

})();
