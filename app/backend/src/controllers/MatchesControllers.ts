import { Request, Response } from 'express';
import MatchesServices from '../services/MatchesServices';

export default class MatchesControllers {
  matchesServices: MatchesServices;

  constructor() {
    this.matchesServices = new MatchesServices();
    this.getAllMatches = this.getAllMatches.bind(this);
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
}
