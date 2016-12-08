angular.module('todo-services', ['ngCookies']);

require('./config/http-config');
require('./lib/api-request');
require('./visibility-managers/background-screen-vis');
require('./visibility-managers/edit-item-vis');
require('./visibility-managers/edit-list-vis');
require('./resource-managers/list-manager');
require('./resource-managers/item-manager');
require('./resource-managers/user-manager');
