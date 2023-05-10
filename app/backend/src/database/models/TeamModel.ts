import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';

class Teams extends Model {
  declare id: number;
  declare teamName: string;
}

Teams.init({
  id: {
    primaryKey: true,
    type: INTEGER,
  },
  teamName: {
    type: STRING,
    field: 'team-name',
  }, 
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',  //é o nome como está no bd.
  timestamps: false,
});

export default Teams;