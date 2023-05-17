import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
// import 'dotenv/config';
// import { IRole } from '../interfaces';

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const secret = process.env.JWT_SECRET || 'jwt_secret';
    const payload = jwt.verify(token, secret);
    res.locals.payload = payload;
    // console.log('decoded', payload);
    // criar uma chave para pegar as infor.
    // res.locals.roles = decoded;
    // return res.status(200).json({ role });
    next();
  } catch (error) {
    // console.log('error', error);
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};
