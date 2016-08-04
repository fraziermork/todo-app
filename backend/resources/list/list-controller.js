'use strict';


const lodash              = require('lodash');
const debug               = require('debug')('todo:listCtrl');
const List                = require(`${__dirname}/list-model`);
const userCtrl            = require(`${__dirname}/../user/user-controller`);
// const itemCtrl            = require(`${__dirname}/../item/item-controller`);
const AppError            = require(`${__dirname}/../../lib/app-error`);

const listCtrl            = module.exports = {};
listCtrl.newList          = newList;
listCtrl.getList          = getList;
listCtrl.updateList       = updateList;
listCtrl.deleteList       = deleteList;
listCtrl.deleteAllLists   = deleteAllLists;
listCtrl.handleListItems  = handleListItems;

/**
 * newList - creates a new list 
 *  
 * @param  {object} listParams    an object with properties for the new list
 * @param  {object} user          the authenticated user's mongo document
 * @return {promise}              a promise that resolves with the new list or rejects with an appError 
 */ 
function newList(listParams, user) {
  debug('newList');
  let newList = null;
  return new Promise((resolve, reject) => {
    List.createAsync(listParams)
      .then((list) => {
        newList = list;
        return userCtrl.manageUserLists(list, user);
      })
      .then((user) => {
        return resolve(newList);
      })
      .catch((err) => {
        return reject(new AppError(400, err));
      });
  });
}






/**
 * getList - finds a list by id
 *  
 * @param  {type}     listId  the _id of the list to find 
 * @return {promise}          a promise that resolves with a found list or rejects with an appError 
 */ 
function getList(listId) {
  debug('getList');
  return new Promise((resolve, reject) => {
    if (!listId) return reject(new AppError(400, 'no listId provided'));
    List.findById(listId)
      .populate('items')
      .exec((err, list) => {
        if (err || !list) {
          return reject(new AppError(404, err || 'no list found'));
        } 
        return resolve(list);
      });
  });
}


/**
 * updateList - updates a lists properties, not to be used to modify a list's items 
 *  
 * @param  {string}     listToUpdate    the list to update
 * @param  {object}     listParams      the incoming request body detailing the changes to make 
 * @return {promise}                    a promise that resolves with the updated list or rejects with an appError 
 */ 
function updateList(listToUpdate, listParams = {}) {
  debug('updateList');
  return new Promise((resolve, reject) => {
    if (Object.keys(listParams).length === 0) {
      return reject(new AppError(400, 'no update content provided'));
    }
    debug('updateList, listParams: ', listParams);
    // TODO: figure out if I need to be more careful about which updates are being allowed through 
    List.findOneAndUpdate({ _id: listToUpdate._id }, 
      { $set: listParams }, 
      { runValidators: true, new: true })
      .populate('items')
      .exec((err, list) => {
        if (err || !list) {
          return reject(new AppError(400, err || 'no list existed, shouldnt have happened'));
        }
        debug('updateList success, updatedList: ', list);
        return resolve(list);
      });
  });
}



/**
 * deleteList - deletes a list from the database, removes references to it from its owner, and deletes all its items
 *  
 * @param  {object} list  the list to delete 
 * @param  {object} user  the user the list belongs to
 * @return {promise}        a promise that rejects with an appError or resolves with nothing 
 */ 
function deleteList(list, user) {
  debug('deleteList');
  
  
  // TODO: need to delete all items in the list 
  return new Promise((resolve, reject) => {
    List.findOneAndRemoveAsync({ _id: list._id })
      .then((deletedList) => {
        return userCtrl.manageUserLists(list, user, { removeFlag: true });
      })
      .then((items) => {
        return resolve();
      })
      .catch((err) => {
        return reject(new AppError(400, err));
      });
  });
}


/**
 * deleteAllLists - deletes all lists belonging to a user
 *  
 * @param  {string} userId  the id of the user 
 * @return {promise}        a promise that resolves with the deleted lists or rejects with an appError 
 */ 
function deleteAllLists(userId) {
  debug('deleteAllLists');
  return new Promise((resolve, reject) => {
    List.find({ owner: userId })
      .remove()
      .exec((err, lists) => {
        if (err) {
          return reject(new AppError(400, 'error deleting all lists'));
        }
        return resolve(lists);
      });
  });
}




/**
 * handleListItems - adds or removes references to an item from a list
 *  
 * @param     {object}    item        the item that is being put into the list or removed from it 
 * @param     {object}    listId      the mongo _id of the list to modify the items of 
 * @param     {object}    options     an object specifying the options for the list items operations 
 * @property  {boolean}   removeFlag  whether to remove the item from the list with the 
 * @return    {promise}               description 
 */ 
function handleListItems(item, listId, options = {}) {
  debug('handleListItems');
  let listOperator = '$push';
  if (options.removeFlag) {
    debug('handleListItems removeFlag true');
    listOperator = '$pull';
  }
  let updatesToList = {};
  updatesToList[listOperator] = { items: item._id };
  
  return new Promise((resolve, reject) => {
    List.findOneAndUpdate(
      { _id: listId }, 
      updatesToList, 
      { runValidators: true, new: true })
      .populate('items')
      .exec((err, updatedList) => {
        if (err || !updatedList) {
          return reject(new AppError(400, err || 'no list existed, shouldnt have happened'));
        }
        return resolve(updatedList);
      });
  });  
}
