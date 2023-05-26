import * as express from 'express';
import LeaderboardControllers from '../controllers/LeaderboardControllers';
// import TeamsControllers from '../controllers/TeamsControllers';

const router = express.Router();
// const teamsControllers = new TeamsControllers();

// para prender (bind) o this.da minha classe teamsContrellers e não da classe do express.
router.get('/home', (req, res) => new LeaderboardControllers().getAllHome(req, res));
// router.get('/:id', (req, res) => teamsControllers.getByIdTeams(req, res));

export default router;
