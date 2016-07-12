/* global __DEVONLY__ __COOKIE_NAME__ */



// const defaults = require('lodash.defaults');
// const assign = require('lodash.assign');

(function() {
  angular.module('todo-services')
    .factory('userManager', [
      '$log', 
      '$cookies', 
      '$route', 
      '$location', 
      'apiRequest', 
      'listManager', 
      'itemManager', 
      returnUserManager
    ]);
  
  function returnUserManager($log, $cookies, $route, $location, apiRequest, listManager, itemManager) {
    let userManager = {
      user: null,

      /**      
       * logout - this deletes the authentication cookie for the user and takes them back to the login page 
       *        
       * @return {type}  description       
       */       
      logout() {
        if (__DEVONLY__) $log.debug('userManager logout');
        $cookies.remove(__COOKIE_NAME__);
        userManager.user  = null;
        listManager.lists = [];
        $location.path('/login');
        $route.reload();
      }
    };
    
    return userManager;
  }
    
})();    
