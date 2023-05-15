import { NextFunction, Request, Response } from 'express';

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  if (!/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/ig.test(email)) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  if (password.length < 6) {
    // const pass = password.some((item) => item >= 6)
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  return next();
};
export default validateLogin;
