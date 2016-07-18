/* global __DEVONLY__ */
// TODO: figure out what to do with errors


// const defaults = require('lodash.defaults');
const assign = require('lodash.assign');

(function() {
  angular.module('todo-services')
    .factory('listManager', [
      '$log', 
      '$window',
      'apiRequest', 
      returnListManager
    ]);
    
  function returnListManager($log, $window, apiRequest) {
    let listManager = {
      lists:       [],
      currentList: null,
      
      /**      
       * getItemsInList - helper method to retrieve all the items in a list and store them on the list upon successful retrieval 
       *        
       * @param  {object}   originalListObj the original list object to retrieve the items for, and store the items on upon success       
       * @return {promise}                  a promise that resolves with the items or rejects if there was an error in the request     
       */       
      getItemsInList(originalListObj) {
        if (__DEVONLY__) $log.debug('listManager getItemsInList');
        return apiRequest('get', `lists/${originalListObj._id}/items`)
          .then((items) => {
            if (__DEVONLY__) $log.log(`SUCCESS in listManager getItemsInList for ${originalListObj.name}`);
            if (__DEVONLY__) $log.log(items);
            originalListObj.items = items;
            return originalListObj;
          });
      },
      
      
      
      
      /**      
       * postNewList  - a helper method to post a new method 
       *              - constructs a placeholder list object in memory, posts it to the database, then updates the local one in memory upon success
       *        
       * @param     {object} listInfo       an object describing the new list
       * @property  {string} name           the name of the list 
       * @property  {string} description    a description of the list      
       * @return    {promise}               a promise that resolves with the updated list or rejects with a server error       
       */       
      postNewList(listInfo) {
        if (__DEVONLY__) $log.debug('listManager postNewList');
        
        // Add the temporary list object into the lists array
        listManager.lists.push(listInfo);
        
        // Return the request
        return apiRequest('post', 'lists', { data: listInfo })
          .then((list) => {
            assign(listInfo, list);
            if (__DEVONLY__) $log.log(`postNewList: SUCCESS  for ${listInfo.name}`, listInfo);
            
            // Update lists in storage and return listInfo into next .then in chain 
            // It doesnt matter that this list has items in it and the ones from login dont--lists always grab all their items on init anyway
            $window.sessionStorage.setItem('todo-user-lists', angular.toJson(listManager.lists));
            listManager.currentList = listInfo._id;
            return listInfo;
          });
      },
      
      
      
      /**      
       * updateList - a helper method to update a list      
       *        
       * @param  {object}   originalListObj the list object       
       * @param  {object}   updates         an object describing the updates to make to the list       
       * @return {promise}                  a promise that resolves with the updated list object or rejects with a server error
       */       
      updateList(originalListObj, updates) {
        if (__DEVONLY__) $log.debug('listManager updateList');
        return new Promise((resolve, reject) => {
          
          
        });
      },
      
      
      
      /**      
       * deleteList - a helper method to delete lists
       *            - TODO: if the list's id is the same as currentList, set currentList to null
       *        
       * @param  {type} originalListObj description       
       * @return {type}                 description       
       */       
      deleteList(originalListObj) {
        if (__DEVONLY__) $log.debug('listManager deleteList');
        return new Promise((resolve, reject) => {
          
          
        });
      },
      
      
      
      /** 
       * moveItemFromListToList - description      
       *        
       * @param  {object} item              description       
       * @param  {object} sourceListId      description       
       * @param  {object} destinationListId description             
       */       
      moveItemFromListToList(item, sourceListId, destinationListId) {
        if (__DEVONLY__) $log.debug(`listManager moveItemFromListToList for ${item.name}`);
        
        // Find the source and destination lists
        let sourceList = listManager.lists.filter((list) => {
          return list._id === sourceListId;
        })[0];
        let destinationList = listManager.lists.filter((list) => {
          return list._id === destinationListId;
        })[0];
        if (__DEVONLY__) $log.log(`moveItemFromListToList for ${item.name}, source list: ${sourceList.name}, destination list: ${destinationList.name}`);
        
        // Move the item from one list to the other 
        sourceList.items = sourceList.items.filter((itemInSourceList) => {
          return itemInSourceList._id !== item._id;
        });
        destinationList.items.push(item);
      }, 
      
      
      
      /**      
       * changeItemIndexInList - this helper function is designed to post the result of changes to item ordering in a list to the database
       *                       - TODO: this wont work until item indices are supported      
       *        
       * @param  {object} list     description       
       * @param  {object} item     description       
       * @param  {number} newIndex description       
       * @return {type}          description       
       */       
      changeItemIndexInList(list, item, newIndex) {
        if (__DEVONLY__) $log.debug('listManager moveItemFromListToList');
        
        
      },
       
       
       
       
       
      /**       
       * setCurrentList - sets the value of listManager.currentList to the id of the input list
       *        
       * @param  {object} list  the list that should be set to the current one        
       * @return {type}         description       
       */       
      setCurrentList(list) {
        if (__DEVONLY__) $log.debug(`listManager setCurrentList to ${list.name}`);
        listManager.currentList = list._id;
      } 
       
    };
    return listManager;
  }
    
})();
