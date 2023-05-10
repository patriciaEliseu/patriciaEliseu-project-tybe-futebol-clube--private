'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('teams', {
       id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
       },
       teamName: {
        allowNull: false,
        field: 'team_name',
        type: Sequelize.STRING,
       }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('teams');
  },
};
