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
    'editListVis',
    ListController,
  ]);
  
  function ListController($log, $scope, itemManager, listManager, editListVis) {
    const vm                             = this;
    vm.error                             = null;
    vm.list                              = $scope.list;
    
    // Properties for editListName
    vm.nameEditable                      = false;
    vm.editedName                        = vm.list.name;
    vm.editedList                        = {};
    
    // Properties for addItemForm
    vm.addItemVisible                    = false;
    
    // Attach methods
    vm.initialize                        = initialize;
    vm.toggleNameEditable                = toggleNameEditable;
    vm.handleNameEditFormSubmit          = handleNameEditFormSubmit;
    vm.showEditListForm                  = showEditListForm;
    vm.showAddItemForm                   = showAddItemForm;
    vm.showListAndItsItemsBelowMdScreens = showListAndItsItemsBelowMdScreens;
    vm.itemMoved                         = itemMoved;
    vm.itemDropped                       = itemDropped;
    vm.itemDragCancelled                 = itemDragCancelled;
    
    
    
    
    /**    
     * initialize - this makes the initial GET request to populate the items in the list
     *          
     */     
    function initialize() {
      if (__DEVONLY__) $log.debug(`ListController initialize for ${vm.list.name}`);
      if (!vm.list._id) {
        if (__DEVONLY__) $log.warn(`ListController initialize for ${vm.list.name} awaiting post results`);
        return;
      }
      
      listManager.getItemsInList(vm.list)
        .then((items) => {
          if (__DEVONLY__) $log.log(`ListController initialize: SUCCESS for ${vm.list.name}`);
          if (vm.list.items.length === 0) vm.addItemVisible = true;
          // $scope.$digest();
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
     * showEditListForm - toggles the visibility of the listActions menu    
     *         
     */     
    function showEditListForm() {
      if (__DEVONLY__) $log.debug('ListController showEditListForm');
      editListVis.showEditListForm(vm.list);
    }
    
    
    
    /**    
     * showAddItemForm - toggles the visibility of the addItemForm for the list. 
     *      
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
    
    
    
    
    
    /**    
     * itemMoved - This method runs whenever an item is moved. It removes the item from the list and posts the update to the database. 
     *      
     * @param  {number} index the index the item to remove is at       
     * @param  {object} event the drag event that triggered this     
     * @return {type}       description     
     */     
    function itemMoved(index, event) {
      if (__DEVONLY__) $log.debug(`ListController itemMoved, index: ${index}`);
      vm.list.items.splice(index, 1);

      let debugString = 'Items are: \n';
      vm.list.items.forEach((item, i) => {
        debugString += `${i}: ${item.name} \n`;
      });
      $log.warn(debugString);
      
      listManager.updateList(vm.list)
        .then((updatedList) => {
          $log.log('ITEM MOVE CALLBACK, updatedList: ', updatedList);
        })
        .catch((err) => {
          $log.error('ITEM MOVE CALLBACK, err: ', err);
        });
    }
    
    
    
    
    /**    
     * itemDropped - This runs whenever an item is dropped into the list
     *      
     * @param  {object}  event    The     
     * @param  {number}  index    the index the item was added in at     
     * @param  {object}  item     the item object     
     * @param  {string}  type     the type of what is being dropped in      
     * @param  {boolean} external Whether the item came from an external source or not     
     * @return {object}           The object to put into the list     
     */     
    function itemDropped(dragEvent, index, item, type, external) {
      $log.log('dnd-drop callback');
      if (__DEVONLY__) $log.debug(`ListController (list: ${vm.list.name}) item (name: ${item.name}) dropped at ${index}`);
            
      // Break out and don't make the request to update the list unless the item was moved to a list it doesn't already belong to 
      // This prevents this callback from 
      for (let i = 0; i < vm.list.items.length; i++) {
        if (vm.list.items[i]._id === item._id) {
          $log.warn(`ListController itemDropped found duplicate ${vm.list.items[i].name}`);
          return item;
        }
      }
      
      listManager.updateList(vm.list)
        .then((updatedList) => {
          $log.log('ITEM DROP CALLBACK, updatedList: ', updatedList);
          //  $scope.$apply();
        })
        .catch((err) => {
          $log.error('ITEM DROP CALLBACK, err: ', err);
        });

      return item;
    }
    
    function itemDragCancelled() {
      if (__DEVONLY__) $log.debug('ListController itemDragCancelled');
      
      
    }
    
    // /**    
    //  * itemDragOver - This callback runs whenever a list item is dragged over a list--it runs repeatedly    
    //  *      
    //  * @param  {object} event    the dragover event      
    //  * @param  {number} index    the position the item would be dropped at      
    //  * @param  {string} type     the type of the item being dropped, must be an item     
    //  * @param  {boolean} external Whether item is from an external source     
    //  * @return {boolean}          Whether to allow drop events or not     
    //  */     
    // function itemDragOver(event, index, type, external) {
    //   if (__DEVONLY__) $log.debug('ListController itemDragOver');
    // }
    
  }
  
})();
