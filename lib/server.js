'use strict';

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    redis = require('connect-redis');

app.use(cookieParser());
var RedisStore = redis(session);
app.use(session({
  secret: 'Shhhhh!',
  resave: false,
  saveUninitialized: true,
  store: new RedisStore()
}));

app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'pug');

app.get("/", function(request, response) {
  response.render('index');
});

// app.get('/:name', function(request, response) {
//   response.render('name', { name: request.params.name });
// });

var models = require('../models');

app.get('/tasks', function(request, response) {
  models.Task.findAll()
    .then(function(tasks) {
      response.format({
        html: function() {
          response.render('tasks/tasks', { tasks: tasks });
        },
        json: function() {
          response.json(tasks);
        }
      });
    });
});

app.get('/tasks/:task_id', function(request, response) {
  console.log(request.session);
  models.Task.findById(request.params.task_id)
    .then(function(task) {
      response.render('tasks/task', { task: task });
    });
});

function redirectToTask(response, task) {
  response.redirect('/tasks/' + task.id);
}

app.post('/tasks/:task_id', function(request, response) {
  models.Task.findById(request.params.task_id)
    .then(function(task) {
      task.name = request.body.todo;
      return task.save();
    }).then(function (task) {
      request.flash('bg-info', "Updated successfully!");
      request.session.save(function() {
        redirectToTask(response, task);
      });
    });
});

app.post('/tasks', function(request, response) {
  models.Task.create({ name: request.body.todo })
    .then(function(task) {
      request.flash('bg-info', "Added task " + task.name + " successfully!");
      request.session.save(function() {
        response.redirect("/tasks");
      });
    });
});

app.get('/users/register', function(request, response) {
  response.render('users/register');
});

var User = require('../models').User;
app.post('/users/register', function(request, response) {
  if (request.body.password !== request.body.password_confirm) {
    request.flash('bg-warning', 'Passwords must match');
    request.session.save(function() {
      response.redirect('/users/register');
    });
  } else {
    User.findOne({ where: { username: request.body.username }})
      .then(function(existingUser) {
        if (existingUser) {
          request.flash('bg-warning', "User already exists");
          request.session.save(function() {
            response.redirect('/users/register');
          })
        } else {
          User.create(request.body).then(function(user) {
            request.session.user_id = user.id;
            request.session.save(function() {
              response.redirect('/');
            });
          }, function(error) {
            request.flash('bg-warning', error.message);
            request.session.save(function() {
              response.redirect('/users/register');
            });
          });
        }
      });
  }
});

app.get('/users/login', function(request, response) {
  response.end('/users/login');
});

app.get('/angular-playground', function(request, response) {
  response.render('angular/playground');
});

// allow other modules to use the server
module.exports = app;
