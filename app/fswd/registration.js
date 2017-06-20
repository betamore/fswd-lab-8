
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
                                    console.log(response.data);
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
    .controller('RegistrationController', function() {
        // this is the sample registration controller
        // eslint-disable-next-line
        this.testingCoverage = function() {
            console.log('this will never run');
        };

        this.value = 15;
    });
