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
            if (__DEVONLY__) $log.debug(`postNewItem: SUCCESS for ${itemInfo.name}`);
            assign(itemInfo, item);
            return itemInfo;
          });
      }
      
      
    };
    return itemManager;
  }
    
})();
