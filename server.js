'use strict';

const port    = process.env.PORT || 8080;

const express = require('express');
const app     = express();
const backend = require('./backend/backend-router');
const debug   = require('debug')('todo:server');

// Backend routes now all lie behind /api
app.use('/api', backend);

// Requests to anything else return 
app.use(express.static(`${__dirname}/frontend/build`));

let server = app.listen(port, () => {
  debug('App open on port ', port); 
});
server.isRunning = true;
module.exports   = server;
