import { Request, Response } from 'express';
import ILeaderboard from '../interfaces/leaderboard.interface';
import LeaderboardServices from '../services/LeaderboardServices';

class LeaderboardControllers {
  leaderboardServices: LeaderboardServices;

  constructor() {
    this.leaderboardServices = new LeaderboardServices();
    // LeaderboardControllers.resultSort = LeaderboardControllers.resultSort.bind(this);
  }

  static async resultSort() {
    const leaderboardServices = new LeaderboardServices();
    const resutFindAll = await leaderboardServices.getAllHome();
    if (resutFindAll) {
      const result = await resutFindAll.sort((a: ILeaderboard, b: ILeaderboard) => {
      // Ordenar pelo Total de Pontos (decrescente)
        if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
        // Ordenar pelo Total de Vitórias (decrescente)
        if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;
        // Ordenar pelo Saldo de Gols (decrescente)
        if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
        // Ordenar pelos Gols a Favor (decrescente)
        return b.goalsFavor - a.goalsFavor;
      });
      return result;
    }
  }

  static async getAllHome(req: Request, res: Response) {
    const result = await LeaderboardControllers.resultSort();
    res.status(200).json(result);
  }
}
export default LeaderboardControllers;

// instanciar a classe
// new nome-da-classe()
