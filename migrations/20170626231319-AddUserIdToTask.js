'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.addColumn('Tasks', 'UserId', Sequelize.INTEGER);
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.removeColumn('Tasks', 'UserId');
  }
};
