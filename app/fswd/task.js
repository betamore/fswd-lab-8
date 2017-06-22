// setInterval

var angular = require('angular');
module.exports = angular.module('fswd.task', [])
    .controller('AddTaskController', function(TaskListService) {
        var $ctrl = this;

        $ctrl.addTask = function() {
          var newTask = $ctrl.newTask;
          $ctrl.newTask = "";
          return TaskListService.addTask(newTask);
        };
    })
    .component('addTaskComponent', {
      controller: 'AddTaskController',
      templateUrl: '/partials/addTask'
    })
    .service('TaskListService', function($http, $interval) {
        var tasks;

        this.getAllTheTasks = function() {
            return $http.get('/tasks')
                .then(function(response) {
                    tasks = response.data;
                    return tasks;
                });
        }

        var taskPoller;
        this.startTaskPoller = function() {
            if (!taskPoller) {
                this.getAllTheTasks();
                taskPoller = $interval(this.getAllTheTasks, 5000);
            }
        };

        this.taskList = function() {
            return tasks;
        };

        this.addTask = function(newTask) {
            return $http.post('/tasks', { todo: newTask })
                .then(function(response) {
                    tasks = tasks.concat([response.data]);                    
                });
        };
    })
    .controller('TasksController', function(TaskListService, $scope) {
        var self = this;

        TaskListService.startTaskPoller();
        $scope.$watch(function() {
            return TaskListService.taskList();
        }, function(tasks) {
            self.tasks = tasks;
        });
    });
