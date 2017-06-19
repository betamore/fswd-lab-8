
var angular = require('angular');
module.exports = angular.module('fswd.registration', [])
    .controller('RegistrationController', function() {
        // this is the sample registration controller
        // eslint-disable-next-line
        this.testingCoverage = function() {
            console.log('this will never run');
        };

        this.value = 15;
    });
