import angular from 'angular';

angular.module('fswd.registration', [])
  .directive('uniqueUsername', function($http, $q) {
    return {
      restrict: 'A',
      require: '^ngModel',
      link: function(scope, element, attrs, ctrl) {
        ctrl.$asyncValidators.unique = function(modelValue) {
          console.log('Validating username: ' + modelValue);
          return $http.post('/users/available', { username: modelValue })
            .then(function(response) {
              if (response.data.isAvailable) {
                return true;
              } else {
                return $q.reject("Not unique");
              }
            });
        };
      }
    };
  }); // unique-username
