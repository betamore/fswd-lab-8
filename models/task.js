'use strict';
module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define('Task', {
    name: DataTypes.STRING,
    completedAt: DataTypes.DATE
  }, {
    scopes: {
        publicTasks: {
            where: {
                UserId: null
            }
        },
        incomplete: {
            where: {
                completedAt: null
            }
        },
        completed: {
            where: {
                completedAt: {
                    $ne: null
                }
            }
        },
        completedToday: function() {
            return {
                where: {
                    completedAt: {
                        $gt: new Date()
                    }
                }
            }
        },
        completedXDaysAgo: function(x) {
            console.log(x);
            return {
                where: {
                    completedAt: {
                        $gt: new Date()
                    }
                }
            }
        }
    }
  });

  Task.prototype.isCompleted = function() {
    return !!this.completedAt;
  };

  Task.prototype.markCompleted = function() {
    return this.updateAttributes({completedAt: new Date()});
  };

  Task.associate = function(models) {
    Task.belongsTo(models.User);
  };



  return Task;
};
