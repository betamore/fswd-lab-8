'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Tasks', 'completedAt', Sequelize.DATE);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Tasks', 'completedAt');
  }
};
