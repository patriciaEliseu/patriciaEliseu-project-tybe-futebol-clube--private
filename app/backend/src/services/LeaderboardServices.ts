import MatcheModel from '../database/models/MatcheModel';
import TeamsServices from './TeamsServices';
import MatchesServices from './MatchesServices';
import ILeaderboard from '../interfaces/leaderboard.interface';
import IMatche from '../interfaces/matche.interface';

export default class LeaderboardServices {
  mmodel = MatcheModel;
  tservice: TeamsServices;
  mservice: MatchesServices;
  constructor() {
    this.tservice = new TeamsServices();
    this.mservice = new MatchesServices();
  }

  async getAllHome():Promise<ILeaderboard[] | void> {
    const allTeam = await this.tservice.getAllTeams();
    const lbscoreboard = Promise.all(allTeam.map(async (team) => {
      const mHome = await this.mservice.getAll(Number(team.id));
      return {
        name: team.teamName,
        totalPoints: LeaderboardServices.calculatePoint(mHome),
        totalGames: mHome.length,
        totalVictories: LeaderboardServices.calculateVictory(mHome),
        totalDraws: LeaderboardServices.calculateDraw(mHome),
        totalLosses: LeaderboardServices.calculateLoser(mHome),
        goalsFavor: LeaderboardServices.goalFavor(mHome),
        goalsOwn: LeaderboardServices.goalsOwn(mHome),

      };
    }));
    return lbscoreboard;
  }

  static calculatePoint(matche: IMatche[]) {
    const result = matche.reduce((acc, curr) => {
      if (curr.homeTeamGoals > curr.awayTeamGoals) {
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
      if (curr.homeTeamGoals > curr.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return victorie;
  }

  static calculateDraw(matche: IMatche[]) {
    const draw = matche.reduce((acc, curri) => {
      if (curri.homeTeamGoals > curri.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return draw;
  }

  static calculateLoser(matche: IMatche[]) {
    const loser = matche.reduce((acc, curre) => {
      if (curre.homeTeamGoals > curre.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return loser;
  }

  static goalFavor(matche: IMatche[]) {
    const goals = matche.reduce((acc, curre) =>
      acc + curre.homeTeamGoals, 0);
    return goals;
  }

  static goalsOwn(matche: IMatche[]) {
    const goal = matche.reduce((acc, curre) => acc + curre.awayTeamGoals, 0);
    return goal;
  }
}
