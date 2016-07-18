/* global __DEVONLY__ */ 
// TODO: 


const assign = require('lodash.assign');

(function() {
  angular.module('todo-list')
  .controller('ListController', [
    '$log', 
    '$scope', 
    'itemManager', 
    'listManager', 
    ListController
  ]);
  
  function ListController($log, $scope, itemManager, listManager) {
    const vm                             = this;
    vm.error                             = null;
    vm.list                              = $scope.list;
    
    // Properties for editListName
    vm.nameEditable                      = false;
    vm.editedName                        = vm.list.name;
    
    // Properties for listActions
    vm.listActionsHidden                 = false;
    vm.editedList                        = {};
    
    // Properties for addItemForm
    vm.addItemVisible                    = false;
    
    // Attach methods
    vm.initialize                        = initialize;
    vm.toggleNameEditable                = toggleNameEditable;
    vm.handleNameEditFormSubmit          = handleNameEditFormSubmit;
    vm.showListActions                   = showListActions;
    vm.showAddItemForm                   = showAddItemForm;
    vm.showListAndItsItemsBelowMdScreens = showListAndItsItemsBelowMdScreens;
    
    
    /**    
     * initialize - this makes the initial GET request to populate the items in the list
     *          
     */     
    function initialize() {
      if (__DEVONLY__) $log.debug('ListController initialize');
      if (!vm.list._id) {
        if (__DEVONLY__) $log.warn(`ListController ${vm.list.name} awaiting post results`);
        return;
      }
      
      listManager.getItemsInList(vm.list)
        .then((items) => {
          if (__DEVONLY__) $log.log(`ListController initialize: SUCCESS for ${vm.list.name}`);
        })
        .catch((err) => {
          if (__DEVONLY__) $log.error('ListController initialize: ', err);
        });
    }
    
    
    function toggleNameEditable() {
      if (__DEVONLY__) $log.debug('ListController handleNameEditFormSubmit');
      if (listManager.currentList === null || listManager.currentList === vm.list._id) {
        vm.nameEditable = true;
      }
    }
    
    
    /**    
     * handleNameEditFormSubmit - form handler to run on blur or keydown events for editListName form
     *      
     * @param  {object} event the event that handled the form submit         
     */     
    function handleNameEditFormSubmit(event) {
      if (__DEVONLY__) $log.debug('ListController handleNameEditFormSubmit', event);
      
    }
    
    
    
    
    
    /**    
     * showListActions - toggles the visibility of the listActions menu    
     *         
     */     
    function showListActions() {
      if (__DEVONLY__) $log.debug('ListController showListActions');
      // Only both with setting editedList if they are interested in editing it 
      if (vm.listActionsHidden) {
        if (__DEVONLY__) $log.log('showListActions: initializing editedList');
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
    
    
    
    
    /**   
     * showListAndItsItemsBelowMdScreens - On smaller screens, this hides all other lists and shows this list along with the items that belong to it
     *                                   - sets the value of listManager.currentList, which:
     *                                      - sets a class on other lists to hide them below md
     *                                      - sets a class on this list to tell it to show its subitems below md 
     *                                   - attached as ng-click on a button only visible below md sizes 
     *      
     * @return {type}  description     
     */     
    function showListAndItsItemsBelowMdScreens() {
      if (__DEVONLY__) $log.debug('ListController showListAndItsItemsBelowMdScreens');
      listManager.setCurrentList(vm.list);
    }
    
    
  }
  
})();
