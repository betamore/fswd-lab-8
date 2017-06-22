
var angular = require('angular');
module.exports = angular.module('fswd', [ require('./registration').name,
                                          require('./task').name ]);
