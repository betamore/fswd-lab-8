'use strict';

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    redis = require('connect-redis');

var models = require('../models');

app.use(cookieParser());
/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
    var SequelizeStore = require('connect-session-sequelize')(session.Store);
    var sessionStore = new SequelizeStore({
        db: models.sequelize
    });
    sessionStore.sync();
    app.use(session({
        secret: 'Shhhhh!',
        store: sessionStore,
        saveUninitialized: false,
        resave: false
    }));
} else {
    var RedisStore = redis(session);
    app.use(session({
      secret: 'Shhhhh!',
      resave: false,
      saveUninitialized: true,
      store: new RedisStore()
    }));
}

/* istanbul ignore next */
if (process.env.NODE_ENV === 'development') {
    var webpackDevMiddleware = require("webpack-dev-middleware");
    var webpack = require("webpack");
    var webpackConfig = require("../webpack.config");

    var compiler = webpack(webpackConfig);

    app.use(webpackDevMiddleware(compiler, {
        publicPath: "/", // Same as `output.publicPath` in most cases.
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false
        }
    }));
}

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
if (app.get('env') === 'development') {
  app.locals.pretty = true;
}

app.use(function(request, response, next) {
  // console.log(request.session);
  if (request.session.user_id) {
    models.User.findById(request.session.user_id)
      .then(function(user) {
        if (user) {
          response.locals.user = request.user = user;
        }
        next();
      })
  } else {
    next();
  }
});

app.get("/", function(request, response) {
  response.render('index');
});

// app.get('/:name', function(request, response) {
//   response.render('name', { name: request.params.name });
// });

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
  if (request.user) {
      response.end("You're already logged in. Jerk.")
  } else {
      response.render('users/register');
  }
});

var User = require('../models').User;
app.post('/users/register', function(request, response) {
  if (request.body.password !== request.body.password_confirm) {
    request.flash('bg-warning', 'Passwords must match');
    response.render('users/register')
    // request.session.save(function() {
    //   response.redirect('/users/register');
    // });
  } else {
    User.findOne({ where: { username: request.body.username }})
      .then(function(existingUser) {
        if (existingUser) {
          request.flash('bg-warning', "User already exists");
          response.render('users/register')
          // request.session.save(function() {
          //   response.redirect('/users/register');
          // })
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

app.post('/users/login', function(req, res) {
  User.findOne({ where: { username: req.body.username }})
    .then(function(user) {
      res.format({
        html: function() {
          if (!user) {
            res.end('User not found');
          } else if (user.isValidPassword(req.body.password)) {
            req.session.user_id = user.id;
            req.session.save(function() {
              res.redirect('/');
            });
          } else {
            res.end('Password incorrect');
          }
        },
        json: function() {
          if (!user) {
            res.status(401).json({ error: 'User does not exist' });
          } else if (user.isValidPassword(req.body.password)) {
            req.session.user_id = user.id;
            req.session.save(function() {
              res.json({ success: true });
            });
          } else {
            res.status(401).json({ error: 'Password incorrect' });
          }
        }
      });
    });
});

app.get('/users/logout', function(request, response) {
    request.session.destroy(function() {
        response.redirect('/');
    });
});

app.get('/users/available', function(request, response) {
    if (request.query.username === 'raynersExisting') {
        response.json({ isAvailable: false })
    } else {
        models.User.findOne({ where: { username: request.query.username }})
            .then(function(user) {
                response.json({ isAvailable: !user });
            });        
    }
});

// allow other modules to use the server
module.exports = app;
