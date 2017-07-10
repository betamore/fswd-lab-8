'use strict';

var app = require('./server');
var port = process.env.PORT || 8000;
var db = require('../models');
db.sequelize.sync({ force: true }).then(function() {
    app.listen(port, function() {
      console.log("Test Server listening on port " + port + "!")
    });
});
