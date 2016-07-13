/* global __COOKIE_NAME__ __DEVONLY__ */

(function() {
  angular.module('todo-app', [
    'ngRoute',
    'ngCookies',
    'todo-services', 
    'todo-entry', 
    'todo-navbar', 
    'todo-item-form',
    'todo-item',
    'todo-list-form', 
    'todo-list', 
    'todo-board',
  ])
  .config(['$routeProvider', '$locationProvider', todoRouter]);
  
  // ROUTER 
  function todoRouter($routeProvider, $locationProvider) {
    $routeProvider
      .when('/login', {
        controller:   'EntryController', 
        controllerAs: 'entryCtrl',
        template:     require('../components/entry/entry-view.html'),
      })
      .when('/board', {
        controller:   'BoardController', 
        controllerAs: 'boardCtrl',
        template:     require('../components/board/board-view.html'),
      })
      .otherwise('/login');
      
    // $locationProvider.html5Mode(true);
  }

})();
