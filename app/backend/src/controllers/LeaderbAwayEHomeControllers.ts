import { Request, Response } from 'express';
import ILeaderboard from '../interfaces/leaderboard.interface';
import LeaderbAwayEHomeServices from '../services/LeaderbAwayEHomeServices';

class LeaderbAwayEHomeControllers {
  leaderbAwayHomeServices: LeaderbAwayEHomeServices;

  constructor() {
    this.leaderbAwayHomeServices = new LeaderbAwayEHomeServices();
  }

  static async resultSort() {
    const leaderbAwayEHomeServices = new LeaderbAwayEHomeServices();
    const resutFindAllAeH = await leaderbAwayEHomeServices.getAllAeH();
    if (resutFindAllAeH) {
      const result = await resutFindAllAeH.sort((a: ILeaderboard, b: ILeaderboard) => {
      // Ordenar pelo Total de Pontos (decrescente)
        if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
        // Ordenar pelo Total de Vitórias (decrescente)
        if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;
        // Ordenar pelo Saldo de Gols (decrescente)
        if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
        // Ordenar pelos Gols a Favor (decrescente)
        return b.goalsFavor - a.goalsFavor;
      });
      console.log('judassssssssss', result);
      return result;
    }
    return resutFindAllAeH;
  }

  static async getAllAeH(req: Request, res: Response) {
    const result = await LeaderbAwayEHomeControllers.resultSort();
    res.status(200).json(result);
  }
}

export default LeaderbAwayEHomeControllers;

// instanciar a classe
// new nome-da-classe()
