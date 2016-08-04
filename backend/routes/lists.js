'use strict';

const debug           = require('debug')('todo:listsRouter');
const getListMidware  = require(`${__dirname}/../lib/get-list-middleware`);
// const AppError        = require(`${__dirname}/../lib/app-error`);
const listCtrl        = require(`${__dirname}/../resources/list/list-controller`);

const listsRouter     = require('express').Router();
module.exports        = listsRouter;

listsRouter.route('/')
  // POST route for creating a new list owned by the authenticated user
  .post((req, res, next) => {
    debug('POST made to /lists');
    let listParams    = req.body;
    listCtrl.newList(listParams, req.user)
      .then((list) => {
        return res.status(200).json(list.toObject());
      })
      .catch(next);
  })
  
  // GET route for getting all of the authenticated user's lists
  .get((req, res, next) => {
    debug('GET made to /lists');    
    return res.status(200).json(req.user.lists);
  });

// Attaches requested list to req, ensures that authenticated user owns that list
listsRouter.use('/:listId', getListMidware);

listsRouter.route('/:listId')
  // GET route for retrieving a single list owned by the authenticated user
  .get((req, res, next) => {
    debug('GET made to /lists/:listId');
    return res.status(200).json(req.list);
  })
  
  // PUT route for updating a single list owned by the authenticated user
  .put((req, res, next) => {
    debug('PUT made to /lists/:listId'); 
    
    // remove properties that they shouldn't be able to change
    delete req.body._id;
    delete req.body.creationDate;
    
    listCtrl.updateList(req.list, req.body)
      .then((list) => {
        return res.status(200).json(list);
      })
      .catch(next);
  })
  
  // DELETE route for deleting a single list owned by the authenticated user
  .delete((req, res, next) => {
    debug('DELETE made to /lists/:listId');
    listCtrl.deleteList(req.list, req.user)
      .then(() => {
        return res.status(204).end();
      })
      .catch(next);
  });
