/* global __DEVONLY__ */

angular.module('todo-app', [
  'ngRoute',
  'ngCookies',
  'dndLists',
  'todo-services', 
  'todo-background-screen',
  'todo-entry', 
  'todo-navbar', 
  'todo-edit-item-form',
  'todo-new-item-form',
  'todo-item',
  'todo-edit-list-form', 
  'todo-new-list-form', 
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
}
