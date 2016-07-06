/* global __DEVONLY__ */

(function() {
  angular.module('todo-entry')
  .controller('EntryController', ['$log', '$window', EntryController]);
  
  function EntryController($log, $window) {
    const vm                    = this;
    vm.error                    = null;
    
    vm.loginVisible             = true;
    vm.login                    = {};
    vm.login.username           = null;
    vm.login.password           = null;
    
    vm.createAccountVisible     = false; 
    $log.debug('vm.createAccountVisible:', vm.createAccountVisible);
    vm.create                   = {};
    vm.create.username          = null;
    vm.create.password          = null;
    vm.create.passwordConfirm   = null;
    vm.create.email             = null;
    
    vm.initialize               = initialize;
    vm.checkAriaHidden          = checkAriaHidden;
    vm.toggleWhichFormIsVisible = toggleWhichFormIsVisible;
    vm.login                    = login;
    vm.createAccount            = createAccount;
    
    
    
    /**    
     * initialize - description    
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
      let check = $window.innerWidth > 992 || condition;
      if (__DEVONLY__) $log.info('width greater than 992 is:', $window.innerWidth > 992);
      if (__DEVONLY__) $log.info('condition is: ', condition);
      if (__DEVONLY__) $log.info('check is: ', !check);
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
      
      
    }
    
    function createAccount() {
      if (__DEVONLY__) $log.debug('EntryController createAccount');
      
      
    }
    
  }
  
})();
