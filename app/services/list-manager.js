/* global __DEVONLY__ */

// const defaults = require('lodash.defaults');

(function() {
  angular.module('todo-services')
    .factory('listManager', ['$log', 'apiRequest', returnListManager]);
    
  function returnListManager($log, apiRequest) {
    if (__DEVONLY__) $log.debug('returnListManager');
    
    
  }
    
});
