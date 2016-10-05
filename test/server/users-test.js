'use strict';

require('../setup');

// code to test
var server = require('../../lib/server');

// libraries
var request = require('supertest-as-promised').agent,
    User = require('../../models').User;

describe('/users', function() {
  var agent;

  beforeEach(function() {
    agent = request(server);
  });

  after(function() {
    return User.truncate();
  });

  it('should have a /register page', function() {
    return agent
      .get('/users/register')
      .expect(200);
  });

  it('should have a /login page', function() {
    return agent
      .get('/users/login')
      .expect(200);
  });

  describe('when a user exists', function() {
    var user;
    beforeEach(function() {
      return User.create({ username: 'MyFancyUsername',
                          password: 'MyFancyPassword' })
              .then(function(u) {
                user = u;
              });
    });

    it('should do …', function() {
      console.log("User ID is " + user.id);
      return agent
        .post('/users/register')
        .type('form')
        .send({
          username: 'MyFancyUsername',
          password: 'MyFancyPassword',
          password_confirm: 'MyFancyPassword'
        })
        .expect(200, /That username already exists\./);
    });

  });

});
