import MatcheModel from '../database/models/MatcheModel';
import Team from '../database/models/TeamModel';
import IMatche from '../interfaces/matche.interface';

class MatchesServices {
  model = MatcheModel;

  constructor() {
    this.model = MatcheModel;
  }

  async getAllMatches(inProgress: string | undefined): Promise<MatcheModel[]> {
    if (inProgress === undefined) {
      const matches = await this.model.findAll({ include: [{ model: Team,
        as: 'homeTeam',
        attributes: { exclude: ['id'] } },
      { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } }] });
      return matches;
    }
    const matchStatus = inProgress === 'true';
    const data = await this.model.findAll({
      where: { inProgress: matchStatus },
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } }],
    });
    return data;
  }

  async getAll(id: number) {
    const teamsHome = await this.model.findAll({
      where: { homeTeamId: id, inProgress: false },
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] },
        }],
    });
    return teamsHome;
  }

  async finish(id: number) {
    await this.model.update(
      { inProgress: false },
      { where: { id } },
    );
    const matchefinish = await this.model.findByPk(id);
    return matchefinish;
  }

  async update(id: number, homeTeamGoals:number, awayTeamGoals:number) {
    await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
  }

  async createMatche(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) {
    const data = await this.model.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    }) as IMatche;
    return data;
  }
}

export default MatchesServices;
