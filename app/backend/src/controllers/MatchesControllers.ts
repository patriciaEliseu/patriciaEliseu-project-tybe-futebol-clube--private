import { Request, Response } from 'express';
import MatchesServices from '../services/MatchesServices';
import TeamsServices from '../services/TeamsServices';

export default class MatchesControllers {
  matchesServices: MatchesServices;
  teamsServices: TeamsServices;
  constructor() {
    this.matchesServices = new MatchesServices();
    this.getAllMatches = this.getAllMatches.bind(this);
    this.finish = this.finish.bind(this);
    this.update = this.update.bind(this);
    this.createMatche = this.createMatche.bind(this);
    this.teamsServices = new TeamsServices();
  }

  async getAllMatches(req: Request, res: Response): Promise<void> {
    const { inProgress } = req.query;
    try {
      const matches = await this.matchesServices.getAllMatches(inProgress as unknown as string);
      res.status(200).json(matches);
    } catch (error) {
      res.status(404).json({ message: 'Not found' });
    }
  }

  async finish(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await this.matchesServices.finish(Number(id));
    res.status(200).json({ message: 'Finished' });
  }

  async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this.matchesServices.update(Number(id), homeTeamGoals, awayTeamGoals);
    res.status(200).json({ homeTeamGoals, awayTeamGoals });
  }

  async createMatche(req: Request, res: Response): Promise<Response> {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals,
    } = req.body;
    const homeId = await this.teamsServices.getByIdTeams(homeTeamId);
    const awayId = await this.teamsServices.getByIdTeams(awayTeamId);
    if (!homeId || !awayId) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    if (homeTeamId === awayTeamId) {
      return res.status(422).json({
        message: 'It is not possible to create a match with two equal teams' });
    }
    const newMatch = await this.matchesServices
      .createMatche(homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals);
    return res.status(201).json(newMatch);
  }
}
