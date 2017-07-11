require('fswd/task');

var sinon = require('sinon');

describe.only('fswd.task', function() {
    beforeEach(angular.mock.module('fswd.task'));

    describe('TaskListService', function() {
        describe('startTaskPoller', function() {
        it('should start the task poller if called once', inject(function(TaskListService) {
            var stub = sinon.stub(TaskListService, 'getAllTheTasks');

            TaskListService.startTaskPoller();
            stub.calledOnce.should.be.true;
        }));

        it('should start the task poller once if called twice', inject(function(TaskListService) {
            var stub = sinon.stub(TaskListService, 'getAllTheTasks');

            TaskListService.startTaskPoller();
            TaskListService.startTaskPoller();
            stub.calledOnce.should.be.true;
        }));
        });
        describe('getAllTheTasks', function() {
            it('should make a request to /tasks', function(done) {
                inject(function($httpBackend, TaskListService, $rootScope) {
                    $httpBackend.expectGET('/tasks')
                        .respond([ { id: 1, name: "Things" }]);

                    TaskListService.getAllTheTasks()
                        .then(function(tasks) {
                            tasks.should.eql([{ id: 1, name: 'Things' }]);
                        })
                        .then(function() {
                            done();
                        });
                    $httpBackend.flush();
                    $rootScope.$digest();
                });
            });
        });
    });
});
