/* global __DEVONLY__  __COOKIE_NAME__ */

(function() {
  angular.module('todo-services')
    .factory('rerouteCheck', [
      '$log', 
      '$window', 
      '$cookies', 
      '$route', 
      '$location', 
      'userManager', 
      returnRerouteCheck
    ]);
  
  function returnRerouteCheck($log, $window, $cookies, $route, $location, userManager) {
    
    /**    
     * rerouteCheck - a service to check if the user is authenticated and return to login if they aren't
     *              - checks whether a cookie called __COOKIE_NAME__ is stored (__COOKIE_NAME__ value set in .npmrc)
     *      
     */     
    return function rerouteCheck() {
      if (__DEVONLY__) $log.debug('rerouteCheck');
      let cookie = $cookies.get(__COOKIE_NAME__);
      $log.warn(cookie);
      if (!cookie && $location.path() !== '/login') {
        if (__DEVONLY__) $log.debug('rerouteCheck REROUTING');
        $cookies.remove(__COOKIE_NAME__);
        $location.path('/login');
        $route.reload();
      }
    };
  }
  
})();
