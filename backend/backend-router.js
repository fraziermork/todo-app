'use strict';

// HANDLE PORTS AND ENVIRONMENT VARIABLES
// using MONGODB_URI
const DB_PORT           = process.env.MONGODB_URI || 'mongodb://localhost/db';

// LOAD NPM MODULES
const express           = require('express');
const bodyParser        = require('body-parser').json();
const cookieParser      = require('cookie-parser');
const mongoose          = require('mongoose');
const Promise           = require('bluebird');
const morgan            = require('morgan');
const debug             = require('debug')('todo:backend');

// LOAD CUSTOM MIDDLEWARES
const errMidware        = require(`${__dirname}/lib/error-response-middleware`);
const basicAuthMidware  = require(`${__dirname}/lib/basic-authentication-middleware`);
const tokenAuthMidware  = require(`${__dirname}/lib/token-authentication-middleware`); // attaches authenticated user as req.user 
const getListMidware    = require(`${__dirname}/lib/get-list-middleware`); // attaches list w/ listId as req.list

// LOAD ROUTERS
const newAccountRouter  = require(`${__dirname}/routes/new-account`);
const loginRouter       = require(`${__dirname}/routes/login`);
const listsRouter       = require(`${__dirname}/routes/lists`);
const itemsRouter       = require(`${__dirname}/routes/items`);

// HANDLE SETUP 
const router            = express.Router();
Promise.promisifyAll(mongoose);

// HANDLE DATABASE SETUP 
mongoose.connect(DB_PORT);

// ////////////////////////////////////////
// CONFIGURE EXPRESS
// ATTACH SHARED MIDDLEWARE 
router.use(morgan('dev'));
router.use(bodyParser); 

// UNAUTHENTICATED ROUTES
router.use('/new-account', newAccountRouter);
router.use('/login', basicAuthMidware, loginRouter);

// AUTHENTICATED ROUTES 
router.use(cookieParser());
router.use(tokenAuthMidware);
router.use('/lists', listsRouter);
router.use('/lists/:listId/*', getListMidware);
router.use('/lists/:listId/items', itemsRouter);

// FINISH SETUP
router.all('*', function return404NotFound(_, res) {
  debug('*:404');
  return res.status(404).send('Not Found');
});
router.use(errMidware);

module.exports    = router;
