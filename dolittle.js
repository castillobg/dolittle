angular.module('dolittle', [])
.factory('dolittle', function(){
  'use strict'

  function snake(obj){
    return iterate(obj, function(propName){
      return propName.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
    });
  };

  function camel(obj){
    return iterate(obj, function(propName){
      return propName.replace(/^_+/, '')
        .replace(/_+([a-z])/g, function(_, char) {
          return char.toUpperCase();
        });
    });
  };

  function iterate(obj, convert){
    if(typeof obj !== 'object'){
      return obj;
    }
    if(obj == null) {
      return null;
    }
    if(obj instanceof Array) {
        return translateArray(obj, convert);
    }
    var translatedObj = {};
    for(var prop in obj){
      if(obj[prop] instanceof Array){
        translatedObj[convert(prop)] = translateArray(obj[prop], convert);
      }
      else if((typeof obj[prop] !== null) && (typeof obj[prop] === 'object')){
        translatedObj[convert(prop)] = iterate(obj[prop], convert);
      }
      else {
        translatedObj[convert(prop)] = obj[prop];
      }
    }
    return translatedObj;
  }

  function translateArray(arr, convert) {
    var translatedArray = [];
    for(var i = 0; i < arr.length; i++){
      translatedArray.push(iterate(arr[i], convert));
    }
    return translatedArray
  }

  var translate = {
    'to': {
      'snake' : snake,
      'camel' : camel
    }
  };

  var to = {
    'snake' : snake,
    'camel' : camel
  }

  return {
    'translate': translate,
    'to' : to
  };
});
