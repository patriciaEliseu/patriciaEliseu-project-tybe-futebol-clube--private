import TeamModel from '../database/models/TeamModel';
import Team from '../interfaces/team.interface';

class TeamsServices {
  model = TeamModel;

  // constructor() {
  //   // this.model = TeamModel;
  // }

  async getAllTeams(): Promise<Team[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  async getByIdTeams(id: number): Promise<Team | null> {
    // console.log('thissss', TeamModel);
    const idTeam = await this.model.findByPk(id);
    return idTeam;
  }
}

export default TeamsServices;
