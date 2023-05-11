import { Request, Response } from 'express';
import TeamsServices from '../services/TeamsServices';

class TeamsControllers {
  teamsServices: TeamsServices;

  constructor() {
    this.teamsServices = new TeamsServices();
    this.getAllTeams = this.getAllTeams.bind(this);
  }

  async getAllTeams(_req: Request, res: Response): Promise<void> {
    const teams = await this.teamsServices.getAllTeams();
    res.status(200).json(teams);
  }
}
export default TeamsControllers;

// instanciar a classe
// new nome-da-classe()
