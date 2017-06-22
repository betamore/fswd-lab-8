
var angular = require('angular');
module.exports = angular.module('fswd.registration', [])
    .directive('uniqueUsername', function($q, $http) {
        return {
                restrict: 'A',
                require: '^ngModel',
                link: function(scope, elem, attrs, ctrl) {
                    ctrl.$asyncValidators.uniqueUsername = function(value) {
                        return $q(function(resolve, reject) {
                            $http.get('/users/available?username=' + value)
                                .then(function(response) {
                                    if (response.data.isAvailable) {
                                        resolve();
                                    } else {
                                        reject();
                                    }
                                });
                        })
                    };
                }
        };
    })
    .controller('RegistrationController', function($scope) {
        // this is the sample registration controller
        var $reg = this;
        // eslint-disable-next-line
        this.testingCoverage = function() {
            console.log('this will never run');
        };

        $scope.$watch(function() {
            return $reg.password;
        }, function(newVal) {
            $scope.registration.password_confirm.$setValidity('passwordMatch', newVal === $reg.password_confirm);
            $scope.registration.password.$setValidity('passwordMatch', newVal === $reg.password_confirm);
            if (newVal === $reg.password_confirm) {
                console.log('They match!');
            } else {
                console.log('No matchy');
            }
        });

        $scope.$watch(function() {
            return $reg.password_confirm;
        }, function(newVal) {
            $scope.registration.password_confirm.$setValidity('passwordMatch', newVal === $reg.password);
            $scope.registration.password.$setValidity('passwordMatch', newVal === $reg.password);
            if (newVal === $reg.password) {
                console.log('They match!');
            } else {
                console.log('No matchy');
            }

        });
    });
