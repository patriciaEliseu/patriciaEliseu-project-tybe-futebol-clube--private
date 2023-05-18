import { Request, Response } from 'express';
import MatchesServices from '../services/MatchesServices';

export default class MatchesControllers {
  matchesServices: MatchesServices;

  constructor() {
    this.matchesServices = new MatchesServices();
    this.getAllMatches = this.getAllMatches.bind(this);
    this.finish = this.finish.bind(this);
    this.update = this.update.bind(this);
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
}
