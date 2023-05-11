import { Request, Response } from 'express';
import TeamsServices from '../services/TeamsServices';

class TeamsControllers {
  teamsServices: TeamsServices;

  constructor() {
    this.teamsServices = new TeamsServices();
    this.getAllTeams = this.getAllTeams.bind(this);
    this.getByIdTeams = this.getByIdTeams.bind(this);
  }

  async getAllTeams(_req: Request, res: Response): Promise<void> {
    const teams = await this.teamsServices.getAllTeams();
    res.status(200).json(teams);
  }

  async getByIdTeams(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const idTeam = await this.teamsServices.getByIdTeams(+id);
    if (idTeam) {
      res.status(200).json(idTeam);
    }
  }
}
export default TeamsControllers;

// instanciar a classe
// new nome-da-classe()
