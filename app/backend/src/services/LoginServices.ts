import UserModel from '../database/models/UserModel';

class LoginServices {
  model = UserModel;

  constructor() {
    this.model = UserModel;
  }

  async createLogin(email:string): Promise<UserModel> {
    const user = await this.model.findOne({ where: { email },
    });
    if (!user) {
      throw new Error();
    }
    return user;
  }

  // async getByIdTeams(id: number): Promise<Team | null> {
  //   const idTeam = await this.model.findByPk(id);
  //   return idTeam;
  // }
}

export default LoginServices;
