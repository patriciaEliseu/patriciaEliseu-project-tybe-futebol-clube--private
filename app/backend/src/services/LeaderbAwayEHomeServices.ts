import MatcheModel from '../database/models/MatcheModel';
import TeamsServices from './TeamsServices';
import MatchesServices from './MatchesServices';
// import ILeaderboard from '../interfaces/leaderboard.interface';
import IMatche from '../interfaces/matche.interface';

export default class LeaderbAwayEHomeServices {
  mmodel = MatcheModel;
  tservice: TeamsServices;
  mservice: MatchesServices;
  constructor() {
    this.tservice = new TeamsServices();
    this.mservice = new MatchesServices();
  }

  // async getAllAeH():Promise<any> {
  //   const allTeamAeH = await this.tservice.getAllTeams();
  //   const lbscoreboardAeH = Promise.all(allTeamAeH.map(async (team) => {
  //     const mAeH = await this.mservice.getAllAeH(Number(team.id)); /* console.log('mAeH', mAeH); */

  //     return { name: team.teamName,
  //       totalPoints: LeaderbAwayEHomeServices.calculatePoint(mAeH),
  //       // totalGames: mAeH.length,
  //       // totalVictories: LeaderbAwayEHomeServices.calculateVictory(mAeH),
  //       // totalDraws: LeaderbAwayEHomeServices.calculateDraw(mAeH),
  //       // totalLosses: LeaderbAwayEHomeServices.calculateLoser(mAeH),
  //       // goalsFavor: LeaderbAwayEHomeServices.goalFavor(mAeH),
  //       // goalsOwn: LeaderbAwayEHomeServices.goalsOwn(mAeH),
  //       // goalsBalance: LeaderbAwayEHomeServices
  //       //   .goalFavor(mAeH) - LeaderbAwayEHomeServices.goalsOwn(mAeH),
  //       // efficiency: LeaderbAwayEHomeServices
  //       //   .calculateEfficiency(LeaderbAwayEHomeServices.calculatePoint(mAeH), mAeH.length),
  //     };
  //   }));
  //   return lbscoreboardAeH;
  // }

  async getAllAeH() {
    const allTeamAeH = (await this.tservice.getAllTeams())
      .map((team) => ({
        id: team.id, teamName: team.teamName, totalPoints: 0,
      }));
    console.log('akakkkkkk', allTeamAeH);
    .map(const mAeH = await this.mservice.getAllAeH();
    const teste = mAeH.reduce((acc, curr) => acc.map((e) => {
      e.totalPoints = LeaderbAwayEHomeServices.calculatePoint(e, curr).totalPoints;
      return e;
    }), allTeamAeH);
    return teste;)
  }

  static calculatePoint(e: any, curr: any) {
    if (curr.awayTeamGoals > curr.homeTeamGoals && e.id === curr.awayTeamId) {
      e.totalPoints += 3;
    }
    if (curr.awayTeamGoals < curr.homeTeamGoals && e.id === curr.awayTeamId) {
      e.totalPoints += 3;
    }
    if (curr.awayTeamGoals === curr.homeTeamGoals
        && (e.id === curr.awayTeamId || e.id === curr.homeTeamId)) {
      e.totalPoints += 1;
    }
    return e;
  }

  // static calculatePoint(matche: IMatche[]) {
  //   const result = matche.reduce((acc, curr) => {
  //     if (curr.awayTeamGoals > curr.homeTeamGoals) {
  //       return acc.awayTeamGoals + 3; // awai vencedor;
  //     }
  //     return acc.homeTeamGoals + 3; // home vencedor;
  //     if (curr.awayTeamGoals === curr.homeTeamGoals) {
  //       return acc.awayTeamGoals + 1 && acc.homeTeamGoals + 1;
  //     }
  //   });
  //   return result;
  // }
  // static calculatePoint(matche: IMatche[]) {
  //   const result = matche.reduce((acc, curr) => {
  //     if (curr.homeTeamGoals < curr.awayTeamGoals) {
  //       const victory = acc + 3; // Vitória
  //       return victory;
  //     }
  //     if (curr.homeTeamGoals === curr.awayTeamGoals) {
  //       const draw = acc + 1; // Empate
  //       return draw;
  //     }
  //     const defeat = acc; // Derrota
  //     return defeat;
  //   }, 0);
  //   return result;
  // }

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
