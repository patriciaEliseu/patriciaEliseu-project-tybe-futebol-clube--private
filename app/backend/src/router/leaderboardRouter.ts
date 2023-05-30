import * as express from 'express';
import LeaderboardControllers from '../controllers/LeaderboardControllers';
import LeaderbAwayControllers from '../controllers/LeaderbAwayControllers';

const router = express.Router();
// const teamsControllers = new TeamsControllers();

// para prender (bind) o this.da minha classe teamsContrellers e não da classe do express.
router.get('/home', (req, res) => LeaderboardControllers.getAllHome(req, res));
router.get('/away', (req, res) => LeaderbAwayControllers.getAllAway(req, res));

export default router;
