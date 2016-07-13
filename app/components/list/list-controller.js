/* global __DEVONLY__ */ 

const assign = require('lodash.assign');

(function() {
  angular.module('todo-list')
  .controller('ListController', ['$log', '$scope', 'listManager', 'itemManager', ListController]);
  
  function ListController($log, $scope, listManager) {
    const vm                    = this;
    vm.error                    = null;
    vm.list                     = $scope.list;
    
    // Properties for editListName
    vm.nameEditable             = false;
    vm.editedName               = vm.list.name;

    // Properties for listActions
    vm.listActionsHidden        = false;
    vm.editedList               = {};
    
    // Attach methods
    vm.initialize               = initialize;
    vm.handleNameEditFormSubmit = handleNameEditFormSubmit;
    vm.showListActions          = showListActions;
    
    
    
    /**    
     * initialize - this makes the initial GET request to populate the items in the list
     *          
     */     
    function initialize() {
      if (__DEVONLY__) $log.debug('ListController initialize');
      listManager.getItemsInList(vm.list)
        .then((items) => {
          if (__DEVONLY__) $log.debug(`SUCCESS in ListController initialize for ${vm.list.name}`);
        })
        .catch((err) => {
          if (__DEVONLY__) $log.error('ERROR in ListController initialize', err);
        });
    }
    
    
    
    /**    
     * handleNameEditFormSubmit - form handler to run on blur or keydown events for editListName form
     *      
     * @param  {object} event the event that handled the form submit         
     */     
    function handleNameEditFormSubmit(event) {
      if (__DEVONLY__) $log.debug('ListController handleNameEditFormSubmit');
      
      
    }
    
    
    
    
    
    /**    
     * showListActions - toggles the visibility of listActions     
     *         
     */     
    function showListActions() {
      if (__DEVONLY__) $log.debug('ListController showListActions');
      assign(vm.editedList, vm.list);
      vm.listActionsHidden = !vm.listActionsHidden;
    }
    
    
    
    // function showListActions() {
    //   if (__DEVONLY__) $log.debug('ListController showListActions');
    //   
    //   
    // }
    
    
  }
  
})();
