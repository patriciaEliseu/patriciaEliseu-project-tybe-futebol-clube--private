import UserModel from '../database/models/UserModel';

class LoginServices {
  model = UserModel;

  constructor() {
    this.model = UserModel;
  }

  async createLogin(email:string): Promise<UserModel | null> {
    const user = await this.model.findOne({ where: { email } });
    //  if(!user) {
    //   throw new Error();
    // }
    return user;
  }
}

export default LoginServices;
