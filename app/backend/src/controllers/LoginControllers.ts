import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import LoginServices from '../services/LoginServices';

interface ILogin {
  email: string,
  password: string,
  role?: boolean
}

class LoginControllers {
  loginServices: LoginServices;

  constructor() {
    this.loginServices = new LoginServices();
    this.createLogin = this.createLogin.bind(this);
  }

  async createLogin(req: Request, res: Response): Promise<Response | void> {
    const secret = process.env.JWT_SECRET || 'jwt_secret';
    try {
      const { email, password } = req.body as ILogin;
      const loginOk = await this.loginServices.createLogin(email);

      // const passwordOk = bcrypt.compareSync(password, loginOk.password);
      if (!loginOk || !bcrypt.compareSync(password, loginOk.password)) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      const newDatavuelue = loginOk.role ? loginOk.role : loginOk.dataValues.role;
      const token = jwt.sign({ data: { email, role: newDatavuelue } }, secret);
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }
}

export default LoginControllers;

// instanciar a classe
// new nome-da-classe()
