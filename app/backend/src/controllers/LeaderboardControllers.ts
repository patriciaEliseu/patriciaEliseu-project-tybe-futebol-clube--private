import { Request, Response } from 'express';
// import ILeaderboard from '../interfaces/leaderboard.interface';
import LeaderboardServices from '../services/LeaderboardServices';

class LeaderboardControllers {
  leaderboardServices: LeaderboardServices;

  constructor() {
    this.leaderboardServices = new LeaderboardServices();
    this.getAllHome = this.getAllHome.bind(this);
  }

  async getAllHome(_req: Request, res: Response) {
    const leaderboardHome = await this.leaderboardServices.getAllHome();
    res.status(200).json(leaderboardHome);
  }

  // async getByIdTeams(req: Request, res: Response): Promise<void> {
  //   const { id } = req.params;

  //   const idTeam = await this.teamsServices.getByIdTeams(+id);
  //   if (idTeam) {
  //     res.status(200).json(idTeam);
  //   }
  // }
}
export default LeaderboardControllers;

// instanciar a classe
// new nome-da-classe()
