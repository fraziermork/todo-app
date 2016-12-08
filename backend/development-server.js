'use strict';

const API_PORT          = process.env.PORT || 3000;
const CLIENT_URL        = process.env.CLIENT_URL || 'http://localhost:8080';

const express           = require('express');
const debug             = require('debug')('todo:server');
const cors              = require('cors');

const backendRouter     = require(`${__dirname}/backend-router`);

const app               = express();

app.use(cors({ 
  origin:      CLIENT_URL,
  credentials: true,
  
  allowedHeaders: [
    'X-XSRF-TOKEN', 
    'authorization',
    'content-type',
    'accept',
  ],
}));

app.use(backendRouter);

let server = app.listen(API_PORT, () => {
  debug(`listening on ${API_PORT}`);
});

server.isRunning  = true;
module.exports    = server;
