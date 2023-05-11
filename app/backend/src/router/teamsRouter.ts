import * as express from 'express';
import TeamsControllers from '../controllers/TeamsControllers';

const router = express.Router();
const teamsControllers = new TeamsControllers();

// para prender (bind) o this.da minha classe teamsContrellers e não da classe do express.
router.get('/', (req, res) => teamsControllers.getAllTeams(req, res));

export default router;
