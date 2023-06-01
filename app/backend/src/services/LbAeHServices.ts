import MatcheModel from '../database/models/MatcheModel';
import TeamsServices from './TeamsServices';
import MatchesServices from './MatchesServices';
import ILeaderboard from '../interfaces/leaderboard.interface';
import IMatche from '../interfaces/matche.interface';
import HServices from './LeaderboardServices';
import AServices from './LeaderbAwayServices';

export default class LbAeHServices {
  mmodel = MatcheModel;
  tservice: TeamsServices;
  mservice: MatchesServices;
  leadHome: HServices;
  leadAway: AServices;

  constructor() {
    this.tservice = new TeamsServices();
    this.mservice = new MatchesServices();
    this.leadHome = new HServices();
    this.leadAway = new AServices();
  }

  async getAllHome():Promise<ILeaderboard[] | void> {
    const allTeam = await this.tservice.getAllTeams();
    const lbscoreboard = Promise.all(allTeam.map(async (team) => {
      const mHome = await this.mservice.getAll(Number(team.id));
      const mAway = await this.mservice.getAllA(Number(team.id));
      return { name: team.teamName,
        totalPoints: HServices.calculatePoint(mHome) + AServices.calculatePoint(mAway),
        totalGames: mHome.length + mAway.length,
        totalVictories: HServices.calculateVictory(mHome) + AServices.calculateVictory(mAway),
        totalDraws: HServices.calculateDraw(mHome) + AServices.calculateDraw(mAway),
        totalLosses: HServices.calculateLoser(mHome) + AServices.calculateLoser(mAway),
        goalsFavor: HServices.goalFavor(mHome) + AServices.goalFavor(mAway),
        goalsOwn: HServices.goalsOwn(mHome) + AServices.goalsOwn(mAway),
        goalsBalance: LbAeHServices.goalsBalanceHeA(mHome, mAway),
        efficiency: LbAeHServices.efficiencyHeA(mHome, mAway),
      };
    }));
    return lbscoreboard;
  }

  static goalsBalanceHeA(mHome: IMatche[], mAway: IMatche[]) {
    return (HServices.goalFavor(mHome) - HServices.goalsOwn(mHome))
     + (AServices.goalFavor(mAway) - AServices.goalsOwn(mAway));
  }

  static efficiencyHeA(mHome: IMatche[], mAway: IMatche[]) {
    return HServices
      .calculateEfficiency(HServices.calculatePoint(mHome)
        + AServices.calculatePoint(mAway), mHome.length + mAway.length);
  }
}
