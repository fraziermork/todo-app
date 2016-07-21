/* global __DEVONLY__ */

const assign = require('lodash.assign');

(function() {
  angular.module('todo-services')
    .factory('itemManager', [
      '$log', 
      'apiRequest', 
      'listManager', 
      returnItemManager
    ]);
    
  function returnItemManager($log, apiRequest, listManager) {
    let itemManager = {

      /**      
       * postNewItem - a helper method to post a new item
       *        
       * @param  {object} itemInfo  an object describing the new item       
       * @param  {object} list      the list that the item belongs to       
       * @return {promise}          a promise that resolves with the posted item or rejects with a server error       
       */       
      postNewItem(itemInfo, list) {
        if (__DEVONLY__) $log.debug('itemManager postNewItem');
        list.items.push(itemInfo);
        return apiRequest('post', `lists/${list._id}/items`, { data: itemInfo })
          .then((item) => {
            // if (__DEVONLY__) $log.log(`postNewItem: SUCCESS for ${itemInfo.name}`);
            assign(itemInfo, item);
            return itemInfo;
          });
      },
      
      updateItem(itemUpdateInfo, item) {
        if (__DEVONLY__) $log.debug('itemManager updateItem');
        return apiRequest('put', `lists/${item.list}/items/${item._id}`, { data: itemUpdateInfo })
          .then((updatedItem) => {
            // if (__DEVONLY__) $log.log('itemManager updateItem then block, updatedItem: ', updatedItem);
            if (itemUpdateInfo.list !== item.list) listManager.moveItemFromListToList(item, item.list, itemUpdateInfo.list);            
            assign(item, updatedItem);
            return item;
          });
      }
      
      
    };
    return itemManager;
  }
    
})();
