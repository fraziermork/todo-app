/* global __DEVONLY__ */ 

const assign = require('lodash.assign');

(function() {
  angular.module('todo-list')
  .controller('ListController', ['$log', '$scope', 'listManager', 'itemManager', ListController]);
  
  function ListController($log, $scope, listManager) {
    const vm                    = this;
    vm.error                    = null;
    vm.list                     = $scope.list;
    vm.items                    = [];
    
    // Properties for editListName
    vm.nameEditable             = false;
    vm.editedName               = vm.list.name;

    // Properties for listActions
    vm.listActionsHidden        = false;
    vm.editedList               = {};
    
    // Properties for addItemForm
    vm.addItemVisible           = false;
    
    // Attach methods
    vm.initialize               = initialize;
    vm.handleNameEditFormSubmit = handleNameEditFormSubmit;
    vm.showListActions          = showListActions;
    vm.showAddItemForm          = showAddItemForm;
    
    
    /**    
     * initialize - this makes the initial GET request to populate the items in the list
     *          
     */     
    function initialize() {
      if (__DEVONLY__) $log.debug('ListController initialize');
      listManager.getItemsInList(vm.list)
        .then((items) => {
          if (__DEVONLY__) $log.debug(`ListController initialize: SUCCESS for ${vm.list.name}`);
          
          // Only once it successfully grabs all the items is the items array populated, afterwards everything is passed by reference so it talks to eachother fine
          vm.items = vm.list.items;
        })
        .catch((err) => {
          if (__DEVONLY__) $log.error('ListController initialize: ', err);
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
     * showListActions - toggles the visibility of the listActions menu    
     *         
     */     
    function showListActions() {
      if (__DEVONLY__) $log.debug('ListController showListActions');
      // Only both with setting editedList if they are interested in editing it 
      if (vm.listActionsHidden) {
        if (__DEVONLY__) $log.debug('showListActions: initializing editedList');
        assign(vm.editedList, vm.list);
      }
      vm.listActionsHidden = !vm.listActionsHidden;
    }
    
    
    
    /**    
     * showAddItemForm - toggles the visibility of the addItemForm for the list. 
     *      
     * @return {type}  description     
     */     
    function showAddItemForm() {
      if (__DEVONLY__) $log.debug('ListController showAddItemForm');
      vm.addItemVisible = !vm.addItemVisible;
    }
    
    
  }
  
})();
