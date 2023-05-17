import MatcheModel from '../database/models/MatcheModel';
import Team from '../database/models/TeamModel';

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

  async finish(id: number) {
    await this.model.update(
      { inProgress: false },
      { where: { id } },
    );
    const matchefinish = await this.model.findByPk(id);
    return matchefinish;
  }
}

export default MatchesServices;
