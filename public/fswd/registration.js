import angular from 'angular';

angular.module('fswd.registration', [])
  .directive('uniqueUsername', function() {
    return {
      restrict: 'A',
      require: '^ngModel',
      link: function(scope, element, attrs, ctrl) {
        ctrl.$validators.unique = function(modelValue) {
          console.log('Validating username: ' + modelValue);
          return modelValue !== 'rayners';
        };
      }
    };
  }); // unique-username
