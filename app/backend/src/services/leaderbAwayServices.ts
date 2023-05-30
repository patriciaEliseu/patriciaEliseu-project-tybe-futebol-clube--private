import MatcheModel from '../database/models/MatcheModel';
import TeamsServices from './TeamsServices';
import MatchesServices from './MatchesServices';
import ILeaderboard from '../interfaces/leaderboard.interface';
import IMatche from '../interfaces/matche.interface';

export default class LeaderbAwayServices {
  mmodel = MatcheModel;
  tservice: TeamsServices;
  mservice: MatchesServices;
  constructor() {
    this.tservice = new TeamsServices();
    this.mservice = new MatchesServices();
  }

  async getAllAway():Promise<ILeaderboard[] | void> {
    const allTeamAway = await this.tservice.getAllTeams();
    const lbscoreboardAway = Promise.all(allTeamAway.map(async (team) => {
      const mAway = await this.mservice.getAllA(Number(team.id));
      return {
        name: team.teamName,
        totalPoints: LeaderbAwayServices.calculatePoint(mAway),
        totalGames: mAway.length,
        totalVictories: LeaderbAwayServices.calculateVictory(mAway),
        totalDraws: LeaderbAwayServices.calculateDraw(mAway),
        totalLosses: LeaderbAwayServices.calculateLoser(mAway),
        goalsFavor: LeaderbAwayServices.goalFavor(mAway),
        goalsOwn: LeaderbAwayServices.goalsOwn(mAway),
        goalsBalance: LeaderbAwayServices.goalFavor(mAway) - LeaderbAwayServices.goalsOwn(mAway),
        efficiency: LeaderbAwayServices
          .calculateEfficiency(LeaderbAwayServices.calculatePoint(mAway), mAway.length),
      };
    }));
    return lbscoreboardAway;
  }

  static calculatePoint(matche: IMatche[]) {
    const result = matche.reduce((acc, curr) => {
      if (curr.homeTeamGoals < curr.awayTeamGoals) {
        const victory = acc + 3; // Vitória
        return victory;
      }
      if (curr.homeTeamGoals === curr.awayTeamGoals) {
        const draw = acc + 1; // Empate
        return draw;
      }
      const defeat = acc; // Derrota
      return defeat;
    }, 0);
    return result;
  }

  static calculateVictory(matche: IMatche[]) {
    const victorie = matche.reduce((acc, curr) => {
      if (curr.homeTeamGoals < curr.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return victorie;
  }

  static calculateDraw(matche: IMatche[]) {
    const draw = matche.reduce((acc, curri) => {
      if (curri.homeTeamGoals === curri.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return draw;
  }

  static calculateLoser(matche: IMatche[]) {
    const loser = matche.reduce((acc, curre) => {
      if (curre.awayTeamGoals < curre.homeTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return loser;
  }

  static goalFavor(matche: IMatche[]) {
    const goals = matche.reduce((acc, curre) =>
      acc + curre.awayTeamGoals, 0);
    return goals;
  }

  static goalsOwn(matche: IMatche[]) {
    const goal = matche.reduce((acc, curre) => acc + curre.homeTeamGoals, 0);
    return goal;
  }

  static calculateEfficiency(totalPoints: number, totalGames: number) {
    const efficiency = (totalPoints / (totalGames * 3)) * 100;
    return efficiency.toFixed(2);
  }
}
