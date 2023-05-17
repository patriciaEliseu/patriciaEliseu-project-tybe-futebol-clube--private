import * as express from 'express';
import LoginControllers from '../controllers/LoginControllers';
import validateLogin from '../middlewares/validateLogin';
import validateTokin from '../middlewares/validateToken';

const router = express.Router();

const loginControllers = new LoginControllers();

// para prender (bind) o this.da minha classe teamsContrellers e não da classe do express.
router.post('/', validateLogin, (req, res) => loginControllers.createLogin(req, res));
router.get('/role', validateTokin, (req, res) => loginControllers.getRole(req, res));

export default router;
