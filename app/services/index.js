(function() {
  angular.module('todo-services', ['ngCookies']);
})();

require('./http-config');
require('./api-request.js');
require('./background-screen-vis');
require('./edit-item-vis');
// require('./edit-list-vis');
require('./list-manager.js');
require('./item-manager.js');
require('./user-manager.js');
