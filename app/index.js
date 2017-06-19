require('bootstrap-webpack');
// var $ = require('jquery');

// var angular = require('angular');
//
// window.$ = $;
//
// var fswdModule = angular.module('fswd', []);
//
// fswdModule.controller('CounterController', function() {
//     var self = this;
//
//     self.counter = 0;
//
//     self.addToCounter = function() {
//         self.counter = self.counter + 1;
//     };
//
//     self.$onInit = function() {
//         console.log("name is " + self.name);
//     };
// });
//
// // counter-directive
// fswdModule.directive('counterDirective', function() {
//     return {
//       restrict: 'AE',
//       controller: 'CounterController',
//       controllerAs: '$ctrl',
//       bindToController: true,
//       scope: {
//           'name': '@'
//       },
//       templateUrl: '/partials/counterDirective'
//     };
// });
//
// fswdModule.service('TodoListService', function() {
//     // var todoList = [ 'Groceries', 'Gas', 'Car Payment', 'Something Extra'];
//     var todoList = [
//         { name: 'Groceries', createdAt: new Date() },
//         { name: 'Gas', createdAt: new Date() },
//         { name: 'Car Payment', createdAt: new Date() },
//         { name: 'Something Beyond', createdAt: new Date() }
//     ];
//
//     this.getTodoList = function() {
//         return todoList;
//     };
//
//     this.addTodo = function(newTodo) {
//         todoList = todoList.concat([ { name: newTodo, createdAt: new Date() } ]);
//     }
// });
//
// fswdModule.controller('TodoListController', function($scope, TodoListService) {
//     var self = this;
//
//     self.addTodo = function(newTodo) {
//         TodoListService.addTodo(newTodo);
//     }
//
//     $scope.$watch(function() {
//         return TodoListService.getTodoList();
//     }, function(newValue) {
//         self.todoList = newValue;
//     });
// });
//
// fswdModule.filter('toUpper', function() {
//     return function(value) {
//       return value.toUpperCase();
//     };
// });
//
// $(function (){
//     $('button.delete').on('click', function() {
//         console.log("I'm deleted!");
//     });
//     $('button#add').click(function(e) {
//         e.preventDefault();
//
//         var newItem = $('input[name=newTodo]').val();
//         var newListItem = $('<li>' + newItem + '<button class="delete">x</button></li>');
//         $('ul').append(newListItem);
//
//         $('input[name=newTodo]').val('');
//     });
// });

// $(function() {
//   $('button#add').click(function(e) {
//     // Make sure the form does not get submitted
//     e.preventDefault();
//
//     // extract the current value of the todo
//     var newTodo = $('input[name=todo]').val();
//
//     // create a completely new (unattached)
//     // list item element (<li>)
//     var newListElement = $('<li></li>');
//
//     // Set its text
//     newListElement.text(newTodo);
//
//     // And add it to the end of the list
//     $('ul').append(newListElement);
//
//     // Then clear out the input element
//     $('input[name=todo]').val("");
//   });
// });
