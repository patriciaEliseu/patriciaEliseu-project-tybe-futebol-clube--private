'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        allowNul: false,
        type:Sequelize.INTEGER,
      },
      username: {
        allowNul: false,
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.STRING,
      },
      email: {
        allowNul: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNul: false,
        type: Sequelize.STRING,
      }
    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
