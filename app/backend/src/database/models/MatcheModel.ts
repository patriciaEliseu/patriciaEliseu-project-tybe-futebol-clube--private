import { /* STRING, */ BOOLEAN, INTEGER, Model } from 'sequelize';
import TeamModel from './TeamModel';

import db from '.';

class Matches extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
  declare homeTeam: string;
  declare awayTeam: string;
}

Matches.init({
  id: {
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    type: INTEGER,
  },
  homeTeamId: {
    type: INTEGER,
    field: 'home_team_id',
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  homeTeamGoals: {
    type: INTEGER,
    field: 'home_team_goals',
  },
  awayTeamId: {
    type: INTEGER,
    field: 'away_team_id',
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  awayTeamGoals: {
    type: INTEGER,
    field: 'away_team_goals',
  },
  inProgress: {
    type: BOOLEAN,
    field: 'in_progress',
  },
  // homeTeam: {
  //   type: STRING,
  //   field: 'home_team',
  // },
  // awayTeam: {
  //   type: STRING,
  //   field: 'away_team',
  // },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Matches.belongsTo(TeamModel, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Matches.belongsTo(TeamModel, { foreignKey: 'awayTeamId', as: 'awayTeam' });

export default Matches;
