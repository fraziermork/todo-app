(function() {
  angular.module('todo-services', ['ngCookies']);
})();

require('./http-config');
require('./api-request.js');
require('./item-manager.js');
require('./list-manager.js');
require('./user-manager.js');
require('./reroute-check.js');
