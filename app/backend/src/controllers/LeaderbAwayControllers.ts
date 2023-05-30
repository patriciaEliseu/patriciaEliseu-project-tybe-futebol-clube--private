import { Request, Response } from 'express';
import ILeaderboard from '../interfaces/leaderboard.interface';
import LeaderdbAwayServices from '../services/leaderbAwayServices';

class LeaderbAwayControllers {
  leaderbAwayServices: LeaderdbAwayServices;

  constructor() {
    this.leaderbAwayServices = new LeaderdbAwayServices();
  }

  static async resultSortAway() {
    const leaderbAwayServices = new LeaderdbAwayServices();
    const resutFindAllAway = await leaderbAwayServices.getAllAway();
    if (resutFindAllAway) {
      const result = await resutFindAllAway.sort((a: ILeaderboard, b: ILeaderboard) => {
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

  static async getAllAway(req: Request, res: Response) {
    const result = await LeaderbAwayControllers.resultSortAway();
    res.status(200).json(result);
  }
}
export default LeaderbAwayControllers;

// instanciar a classe
// new nome-da-classe()
