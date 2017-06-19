'use strict';
module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define('Task', {
    name: DataTypes.STRING,
    completedAt: DataTypes.DATE
  });

  Task.prototype.isCompleted = function() {
    return !!this.completedAt;
  };

  Task.prototype.markCompleted = function() {
    return this.updateAttributes({completedAt: sequelize.fn('NOW')});
  };

  return Task;
};
