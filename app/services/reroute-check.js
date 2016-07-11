/* global __DEVONLY__  __COOKIE_NAME__ */

(function() {
  angular.module('todo-services')
    .factory('rerouteCheck', ['$log', '$window', '$cookie', '$route', '$location', '$cookies', returnRerouteCheck]);
  
  function returnRerouteCheck($log, $window, $cookie, $route, $location, $cookies) {
    
    /**    
     * rerouteCheck - a service to check if the user is authenticated and return to login if they aren't
     *              - checks whether: 
     *                  * a 'todo-user' is in session storage and 
     *                  * a cookie called __COOKIE_NAME__ is stored (__COOKIE_NAME__ value set in .npmrc)
     *      
     */     
    return function rerouteCheck() {
      if (__DEVONLY__) $log.debug('rerouteCheck');
      let cookie = $cookie.get(__COOKIE_NAME__);
      let user   = $window.sessionStorage.get('todo-user');
      if (!cookie || !user) {
        if (__DEVONLY__) $log.debug('rerouteCheck REROUTING');
        $location.path('/login');
        $route.reload();
      }
    };
  }
  
})();
