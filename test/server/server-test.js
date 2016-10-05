'use strict';

require('../setup');

// code to test
var server = require('../../lib/server');

// libraries
var request = require('supertest');

xdescribe('server', function() {
    ['David', 'John', 'Lee'].forEach(function(name) {
        it('should respond with "Hello, ' + name + '!" on /' + name, function(done) {
            request(server)
                .get('/' + name)
                .expect(200, 'Hello, ' + name + '!', done);
        });
    });
});
