import * as express from 'express';
import LeaderboardControllers from '../controllers/LeaderboardControllers';
import LeaderbAwayControllers from '../controllers/LeaderbAwayControllers';
import LeaderbAwayEHomeControlllers from '../controllers/LeaderbAwayEHomeControllers';

const router = express.Router();
// const teamsControllers = new TeamsControllers();

// para prender (bind) o this.da minha classe teamsControllers e não da classe do express.
router.get('/', (req, res) => LeaderbAwayEHomeControlllers.getAllAeH(req, res));
router.get('/home', (req, res) => LeaderboardControllers.getAllHome(req, res));
router.get('/away', (req, res) => LeaderbAwayControllers.getAllAway(req, res));

export default router;
