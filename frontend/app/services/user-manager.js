/* global __DEVONLY__ __COOKIE_NAME__ */



// const defaults = require('lodash.defaults');
// const assign = require('lodash.assign');

(function() {
  angular.module('todo-services')
    .factory('userManager', [
      '$log', 
      '$route', 
      '$window',
      '$cookies', 
      '$location', 
      'apiRequest', 
      'listManager', 
      'itemManager', 
      returnUserManager
    ]);
  
  function returnUserManager($log, $route, $window, $cookies, $location, apiRequest, listManager, itemManager) {
    let userManager = {
      user: null,

      /**      
       * logout - this deletes all cookies and everything in sessionStorage and takes the page back to login 
       *        
       * @return {type}  description       
       */       
      logout() {
        if (__DEVONLY__) $log.debug('userManager logout');
        $cookies.remove(__COOKIE_NAME__);
        $window.sessionStorage.removeItem('todo-user');
        $window.sessionStorage.removeItem('todo-user-lists');
        userManager.user  = null;
        listManager.lists = [];
        $location.path('/login');
        $route.reload();
      }, 
      
      
      /**    
       * rerouteCheck - a service to check if the user is authenticated and return to login if they aren't
       *              - checks whether a cookie called __COOKIE_NAME__ is stored (__COOKIE_NAME__ value set in .npmrc)
       *              - if no cookie, goes to /login
       *              - if on /login but there is a cookie, it takes you to /board
       */
      rerouteCheck() {
        // if (__DEVONLY__) $log.debug('userManager rerouteCheck');
        let cookie = $cookies.get(__COOKIE_NAME__);
        
        // If they aren't logged in but aren't on the login page
        if (!cookie && $location.path() !== '/login') {
          if (__DEVONLY__) $log.warn('rerouteCheck REROUTING to /login');
          userManager.logout();
        }
        
        // If they are logged in, but on the login page 
        // Is this a good idea? It makes the back button a little harder to use
        else if (cookie && $location.path() === '/login') {
          if (__DEVONLY__) $log.warn('rerouteCheck REROUTING to /board');
          $location.path('/board');
          $route.reload();
        }
      }, 
      
      
      
      
          
      /**          
       * handleLogin - stores data from a login or new account request as cookies, then reroutes to /board
       *             - stores the user data, sans lists, as the cookie todo-user 
       *             - stores the initial lists as the cookie todo-user-lists (which will be updated on changes by listManager)
       *             - Finally, reroutes to the /board page 
       *        
       * @param  {object} user the user representation provided by the server in response to a post to /new-account or get to /login            
       */       
      handleLogin(user) {
        if (__DEVONLY__) $log.debug('userManager handleLogin, initial user: ', user);
        
        // Store lists in a separate variable and delete it off user so that there isn't a conflicting set of lists on todo-user and todo-user-lists
        let lists = user.lists;
        delete user.lists;
        
        // Persist the data in case of refresh
        $window.sessionStorage.setItem('todo-user', angular.toJson(user));
        $window.sessionStorage.setItem('todo-user-lists', angular.toJson(lists));
        
        // Attach the data to manager services
        userManager.user  = user;
        listManager.lists = lists; 
        
        // Reroute to /board
        $location.path('/board');
        $route.reload();
      },
      
      
      /**    
       * fetchUserAndListDataFromStorageIfNecessary  - purpose of this is to check if there is a user in storage somewhere, if there is, set that as usermanager.user so that user data persists beyond a page load
       *                                            - always called after rerouteCheck, so doesnt need to check if auth cookie present 
       *                                            - TODO: add a backend route to allow them to fetch info if all they have is cookie? 
       */     
      fetchUserAndListDataFromStorageIfNecessary() {
        if (__DEVONLY__) $log.debug('userManager fetchUserAndListDataFromStorageIfNecessary');
        if (!userManager.user) {
          if (__DEVONLY__) $log.log('fetchUserAndListDataFromStorageIfNecessary, no user found in storage');
          let storedUser = angular.fromJson($window.sessionStorage.getItem('todo-user'));
          if (storedUser) {
            if (__DEVONLY__) $log.log('fetchUserAndListDataFromStorageIfNecessary: User loaded from sessionStorage');
            userManager.user = storedUser;
          }
        }
        if (!listManager.lists.length) {
          let storedLists = angular.fromJson($window.sessionStorage.getItem('todo-user-lists'));
          if (storedLists) {
            if (__DEVONLY__) $log.log('fetchUserAndListDataFromStorageIfNecessary: Lists loaded from sessionStorage');
            listManager.lists = storedLists;
          } else {
            listManager.getAllLists()
          }
        }
      }
    };
    
    return userManager;
  }
    
})();    
