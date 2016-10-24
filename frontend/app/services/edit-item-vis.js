/* global __DEVONLY__ */

(function() {
  angular.module('todo-services')
    .factory('editItemVis', [
      '$log', 
      '$rootScope',
      'listManager',
      'backgroundScreenVis',
      returnEditItemVis
    ]);
  
  function returnEditItemVis($log, $rootScope, listManager, backgroundScreenVis) {
    const editItemVis = {
      visible: false,
      item:    null,
      list:    null,
      
      
      
      
      /**      
       * showEditItemForm - shows the edit item form and background screen
       *        
       * @param  {object} itemToEdit           the item that the form allows the user to make changes to        
       * @param  {object} listTheItemBelongsTo the list that the item belongs to          
       */       
      showEditItemForm(itemToEdit, listTheItemBelongsTo) {
        if (__DEVONLY__) $log.debug(`editItemVis showEditItemForm for ${itemToEdit.name} in ${listTheItemBelongsTo.name}`);
        editItemVis.item      = itemToEdit;
        editItemVis.list      = listTheItemBelongsTo;
        
        $rootScope.$evalAsync(() => {
          editItemVis.visible = true;
        });
        
        backgroundScreenVis.showBackgroundScreenUntilClickOrCondition(editItemVis.hideEditItemForm);
      },
        
      /**      
       * hideEditItemForm - hides the edit item form and background screen
       *            
       */       
      hideEditItemForm() {
        if (__DEVONLY__) $log.debug('editItemVis hideEditItemForm');
        editItemVis.item      = null;
        editItemVis.list      = null;
        
        $rootScope.$evalAsync(() => {
          editItemVis.visible = false;
        });
        
        backgroundScreenVis.hideBackgroundScreen();
      },
      
    };


    return editItemVis;
  }  
    
})();    
