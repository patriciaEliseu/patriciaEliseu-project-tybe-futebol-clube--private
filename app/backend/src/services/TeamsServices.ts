import TeamModel from '../database/models/TeamModel';
import Team from '../interfaces/team.interface';

class TeamsServices {
  model = TeamModel;

  constructor() {
    this.model = TeamModel;
  }

  async getAllTeams(): Promise<Team[]> {
    const teams = await this.model.findAll();
    return teams;
  }
}

export default TeamsServices;
