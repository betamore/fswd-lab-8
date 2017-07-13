// setInterval

var angular = require('angular');
module.exports = angular.module('fswd.task', [require('angular-route')])
    .config(function($routeProvider) {
        $routeProvider.when('/tasks', {
            templateUrl: '/partials/tasks'
        });
        $routeProvider.when('/tasks/:id', {
            templateUrl: '/partials/task',
            controller: function(task) {
                var self = this;
                self.task = task;
            },
            controllerAs: '$ctrl',
            resolve: {
                task: function($route, TaskListService) {
                    return TaskListService.getTask($route.current.params.id)
                }
            }
        })
        $routeProvider.otherwise('/tasks');
    })
    .run(function($rootScope, $location) {
        $rootScope.$on('$routeChangeError', function(event) {
            // alert('PROBLEM CHANGE ROUTES');
            $location.path('/tasks');
        });
    })
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

        this.getTask = function(taskId) {
            return $http.get('/tasks/' + taskId)
                .then(function(response) {
                    return response.data;
                });
        }
    })
    .controller('TasksController', function(TaskListService, $scope) {
        var self = this;

        self.completeTask = function(taskId) {
            console.log("COMPLETING", taskId);
        };

        TaskListService.startTaskPoller();
        $scope.$watch(function() {
            return TaskListService.taskList();
        }, function(tasks) {
            self.tasks = tasks;
        });
    });
