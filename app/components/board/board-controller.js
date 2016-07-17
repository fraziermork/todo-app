/* global __DEVONLY__ */

// const defaults = require('lodash.defaults');

(function() {
  angular.module('todo-board')
    .controller('BoardController', [
      '$log', 
      '$scope', 
      'apiRequest', 
      'itemManager', 
      'listManager', 
      'userManager',
      BoardController
    ]);

  function BoardController($log, $scope, apiRequest, itemManager, listManager, userManager) {
    const vm                    = this;
    vm.error                    = null;
    vm.lists                    = [];
    vm.addListVisible           = false;
    
    // attach methods
    vm.initialize               = initialize;
    vm.checkIfCurrentList       = checkIfCurrentList;
    vm.shouldHideSomeLists      = shouldHideSomeLists;
    vm.toggleListFormVisibility = toggleListFormVisibility;
    
    /**    
     * initialize - checks if they are authenticated and sets data on services from persistence if needed
     *      
     */     
    function initialize() {
      if (__DEVONLY__) $log.debug('BoardController initialize');
      userManager.rerouteCheck();
      userManager.fetchUserAndListDataFromStorageIfNecessary();
      vm.lists = listManager.lists;
      if (!vm.lists.length) vm.addListVisible = true;
    }
    
    
    
    
    /**    
     * checkIfCurrentList - used to set the is-hidden-below-md and is-active-list classes on li elements, which affect behavior below small screen sizes
     *      
     * @param  {object} list  the list object that is the model for the view that these classes are being set on 
     * @return {boolean}      whether the list is active (true) or should be hidden (false), returns true if there is no active list      
     */     
    function checkIfCurrentList(list) {
      // if (__DEVONLY__) $log.debug(`BoardController checkIfCurrentList on ${list.name}, ${list._id === listManager.currentList}`);
      if (listManager.currentList === null) return true;
      return list._id === listManager.currentList;
    }
    
    
    
    /**    
     * shouldHideSomeLists - decides whether to set the current-list-exists class on the board section element, which determines whether the is-hidden-below-md and is-active-list classes do anything
     *      
     * @return {boolean}  whether a current list exists or not     
     */     
    function shouldHideSomeLists() {
      if (__DEVONLY__) $log.debug(`BoardController shouldHideSomeLists ${listManager.currentList !== null}`);
      return listManager.currentList !== null;
    }
    
    function toggleListFormVisibility() {
      if (__DEVONLY__) $log.debug('BoardController toggleListFormVisibility');
      vm.addListVisible = !vm.addListVisible;
    }
    
  }

})();
