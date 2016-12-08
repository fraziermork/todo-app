const assign = require('lodash.assign');

angular.module('todo-services')
  .factory('itemManager', [
    '$log', 
    '$q', 
    'apiRequest', 
    'listManager', 
    returnItemManager,
  ]);
  
function returnItemManager($log, $q, apiRequest, listManager) {
  const itemManager = {

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
    
    
    
    /**      
     * updateItem - Posts updates to an item to the database, and moves it between lists if necessary
     *        
     * @param  {object} item             The original item object        
     * @param  {object} list             The list the item originally belonged to        
     * @param  {object} [itemUpdateInfo] An object describing the updates to make to the item        
     * @return {promise}                 A promise that resolves with the updated item or rejects with an error from the server       
     */       
    updateItem(item, list, itemUpdateInfo) {
      if (__DEVONLY__) $log.debug('itemManager updateItem', itemUpdateInfo, item, list);
      return apiRequest('put', `lists/${list._id}/items/${item._id}`, { data: itemUpdateInfo || item })
        .then((updatedItem) => {
          // if (__DEVONLY__) $log.log('itemManager updateItem then block, updatedItem: ', updatedItem);
          if (itemUpdateInfo.listId !== list._id) {
            $log.log('itemManager updateItem, moving item between lists');
            this.moveItemFromListToList(item, list, itemUpdateInfo.listId)
              .then(() => {
                $log.debug('itemManager moveItemFromListToList success callback');
              });     
          }       
          assign(item, updatedItem);
          return item;
        });
    }, 
    
    
    /** 
     * moveItemFromListToList - Moves an item between two lists, then posts the updates to both lists      
     *        
     * @param  {object} item              The item that is being moved        
     * @param  {object} sourceList        The list object that the item currently belongs to, but is being moved away from      
     * @param  {object} destinationListId The id of the list that the item is being moved to             
     */       
    moveItemFromListToList(item, sourceList, destinationListId) {
      if (__DEVONLY__) $log.debug(`itemManager moveItemFromListToList for ${item.name}`);
      
      if (__DEVONLY__) $log.log('sourceList: \n', sourceList);
      if (__DEVONLY__) $log.log('destinationListId: \n', destinationListId);
      
      // Find the destination list
      let destinationList = listManager.lists.filter((list) => {
        return list._id === destinationListId;
      })[0];
      
      if (__DEVONLY__) $log.log(`moveItemFromListToList for ${item.name}, source list: ${sourceList.name}, destination list: ${destinationList.name}`);
      if (__DEVONLY__) $log.log('destination list: ', destinationList);
      
      // Move the item from one list to the other 
      sourceList.items = sourceList.items.filter((itemInSourceList) => {
        return itemInSourceList._id !== item._id;
      });
      destinationList.items.push(item);
      
      return $q.all(listManager.updateList(sourceList), listManager.updateList(destinationList));
    }, 
    
    
  };
  return itemManager;
}
