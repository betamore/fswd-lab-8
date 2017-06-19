'use strict';

var bcrypt = require('bcryptjs');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      set: function(val) {
        this.setDataValue('password', bcrypt.hashSync(val, 8));
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    }
  });

  User.prototype.isValidPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
  };
  return User;
};
