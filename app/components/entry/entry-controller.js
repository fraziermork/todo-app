/* global __DEVONLY__ */

// TODO: refactor html to be an ng-repeat from a json object to make it more managable? 

(function() {
  angular.module('todo-entry')
  .controller('EntryController', [
    '$log', 
    '$window', 
    '$location', 
    '$route', 
    'apiRequest', 
    'userManager', 
    'listManager', 
    EntryController
  ]);
  
  function EntryController($log, $window, $location, $route, apiRequest, userManager, listManager) {
    const vm                    = this;
    vm.error                    = null; // TODO: build a display for the error to show up in 
    
    // for loginForm
    vm.loginVisible             = true;
    vm.login                    = {};
    vm.login.username           = null;
    vm.login.password           = null;
    
    // for createAccountForm
    vm.createAccountVisible     = false; 
    vm.create                   = {};
    vm.create.username          = null;
    vm.create.password          = null;
    vm.create.passwordConfirm   = null;
    vm.create.email             = null;
    
    // methods
    vm.initialize               = initialize;
    vm.checkAriaHidden          = checkAriaHidden;
    vm.toggleWhichFormIsVisible = toggleWhichFormIsVisible;
    vm.login                    = login;
    vm.createAccount            = createAccount;
    vm.rerouteToBoard           = rerouteToBoard;
    
    
    
    
    /**    
     * initialize - runs on initialization of the login page
     *         
     */     
    function initialize() {
      if (__DEVONLY__) $log.debug('EntryController initialize');
      
    }
    
    
    
    
    /**    
     * checkAriaHidden  - checks to see whether the aria-hidden attribute of a form or tab should be true
     *                  - also used to set the initial value of createAccountVisible
     *                  - checks if window is big enough to show both (above md media query), if not, then checks condition
     *                  - if called without an argument, just says whether window is above md media query 
     *      
     * @param  {boolean} condition  condition to evaluate to truthy or falsy
     * @return {boolean} check      boolean to set aria-hidden to true or false     
     */     
    function checkAriaHidden(condition) {
      // TODO: get forms to render appropriately on window resize
      let check = $window.innerWidth > 992 || condition;
      return !check;
    }
    
    
    
       
    /**       
     * toggleWhichFormIsVisible - toggles whether login or create account form is visible on small screen sizes
     *      
     * @param  {boolean} condition whether the clicked button's form is visible or not currently        
     */     
    function toggleWhichFormIsVisible(condition) {
      if (__DEVONLY__) $log.debug('EntryController toggleWhichFormIsVisible');
      if (!condition) {
        vm.loginVisible         = !vm.loginVisible;
        vm.createAccountVisible = !vm.createAccountVisible;
      }
    }
    
    
    
    
    /**    
     * login - logs a user in, runs when the sbumit button of the loginForm is clicked
     *      
     * @return {type}  description     
     */     
    function login() {
      if (__DEVONLY__) $log.debug('EntryController login');
      
      // build the authorization string for the request, then construct the apiRequest arguments
      let basicAuthString = $window.btoa(`${vm.login.username}:${vm.login.password}`);
      let requestOptions = {
        headers: { 
          authorization: `Basic ${basicAuthString}` 
        }
      };
      vm.login.password = null;
      
      // make the request
      // TODO: move this logic to userManager service
      apiRequest('get', 'login', requestOptions)
        .then((user) => {
          if (__DEVONLY__) $log.debug('EntryController login SUCCESS');
          rerouteToBoard(user);
        })
        .catch((err) => {
          if (__DEVONLY__) $log.error('EntryController login FAILURE', err);
          vm.error = err;
        });
    }
    
    
    
    
    /**    
     * createAccount - creates a new account, runs when the submit button for the createAccountForm is clicked    
     *      
     * @return {type}  description     
     */     
    function createAccount() {
      if (__DEVONLY__) $log.debug('EntryController createAccount');
      
      // Check that the passwords match
      if (vm.create.password !== vm.create.passwordConfirm) {
        if (__DEVONLY__) $log.error('EntryController createAccount passwords didnt match');
        vm.error = 'Your passwords must match';
        delete vm.create.passwordConfirm;
        return;
      }
      
      // Clear old stuff, build the arguments for the request
      delete vm.create.passwordConfirm;
      let requestOptions = {
        data: vm.create
      };
      
      // make the request
      // TODO: move this logic to userManager service
      apiRequest('post', 'new-account', requestOptions)
        .then((user) => {
          if (__DEVONLY__) $log.debug('EntryController createAccount SUCCESS');
          rerouteToBoard(user);
        })
        .catch((err) => {
          if (__DEVONLY__) $log.error('EntryController createAccount FAILURE', err);
          vm.error = err;
        });
    }
    
    
    /**    
     * rerouteToBoard - after login/create account, stores the user data in the userManager service and reroutes to the board view
     *      
     * @return {type}  description     
     */     
    function rerouteToBoard(user) {
      if (__DEVONLY__) $log.debug('EntryController getDataAndRerouteToBoard');
      // Attach the user to the userManager service for future reference, then reroute
      userManager.user  = user;
      listManager.lists = user.lists;
      $location.path('/board');
      $route.reload();
    }
    
  }
  
})();
