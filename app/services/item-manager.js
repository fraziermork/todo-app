/* global __DEVONLY__ */

// const defaults = require('lodash.defaults');

(function() {
  angular.module('todo-services')
    .factory('itemManager', ['$log', 'apiRequest', returnItemManager]);
    
  function returnItemManager($log, apiRequest) {
    if (__DEVONLY__) $log.debug('returnItemManager');
    
    
    
  }
    
});
