'use strict';

// const { type } = require("os");


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      homeTeamId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'home_team_id',
       onUpdate: 'CASCADE',
       onDelete: 'CASCADE',
        references: {
          model: 'teams',
          Key: 'id',
        }
      },
      homeTeamGoals: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'home_team_goals',
      },
      //id time visitante
      awayTeamId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'away_team_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'teams',
          Key: 'id',
        }
      },
      awayTeamGoals: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'away_team_goals',
      },
      inProgress: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        field: 'in_progress',
      }
   });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('matches');
  },
};
