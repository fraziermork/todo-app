/* global __DEVONLY__ */

// TODO: refactor html to be an ng-repeat from a json object? 

(function() {
  angular.module('todo-entry')
  .controller('EntryController', ['$log', '$window', '$location', '$route', 'apiRequest', EntryController]);
  
  function EntryController($log, $window, $location, $route, apiRequest) {
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
    
    
    /**    
     * initialize - runs on initialization    
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
    
    
    
    function login() {
      if (__DEVONLY__) $log.debug('EntryController login');
      
      let basicAuthString = $window.btoa(`${vm.login.username}:${vm.login.password}`);
      
      let requestOptions = {
        headers: { 
          authorization: `Basic ${basicAuthString}` 
        }
      };
      vm.login.password = null;
      
      apiRequest('get', 'login', requestOptions)
        .then((user) => {
          if (__DEVONLY__) $log.debug('EntryController login SUCCESS');
          $window.sessionStorage.setItem('todo-user', angular.toJson(user));
          $location.path('/board');
          $route.reload();
        })
        .catch((err) => {
          if (__DEVONLY__) $log.error('EntryController login FAILURE', err);
          vm.error = err;
        });
    }
    
    
    
    function createAccount() {
      if (__DEVONLY__) $log.debug('EntryController createAccount');
      if (vm.create.password !== vm.create.passwordConfirm) {
        if (__DEVONLY__) $log.error('EntryController createAccount passwords didnt match');
        vm.error = 'Your passwords must match';
        delete vm.create.passwordConfirm;
        return;
      }
      
      delete vm.create.passwordConfirm;
      let requestOptions = {
        data: vm.create
      };
      
      apiRequest('post', 'new-account', requestOptions)
        .then((user) => {
          if (__DEVONLY__) $log.debug('EntryController login SUCCESS');
          $log.warn($location.path());
          $window.sessionStorage.setItem('todo-user', angular.toJson(user));
          $location.path('/board');
          $log.warn($location.path());
          $route.reload();
        })
        .catch((err) => {
          if (__DEVONLY__) $log.error('EntryController login FAILURE', err);
          vm.error = err;
        });
    }
    
  }
  
})();
