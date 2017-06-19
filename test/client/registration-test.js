require('fswd/registration');

describe('fswd.registration', function() {
    beforeEach(angular.mock.module('fswd.registration'));

    it('should exist', function() {
        angular.module('fswd.registration').should.be.ok;
    });

    describe('RegistrationController', function() {
        var controller;
        beforeEach(inject(function($controller, $rootScope) {
            controller = $controller('RegistrationController as ctrl', {
                $scope: $rootScope.$new()
            });
        }));

        it('should exist', function() {
            controller.should.be.ok;
        });

        it('should have value', function() {
            controller.value.should.equal(15);
        });
    });
});
