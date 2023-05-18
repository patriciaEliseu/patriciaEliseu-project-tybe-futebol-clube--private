import * as express from 'express';
import MatchesControllers from '../controllers/MatchesControllers';
import validateToken from '../middlewares/validateToken';

const router = express.Router();

const matchesControllers = new MatchesControllers();

router.get('/', (req, res) => matchesControllers.getAllMatches(req, res));
router.patch('/:id/finish', validateToken, (req, res) => matchesControllers.finish(req, res));
router.patch('/:id', validateToken, (req, res) => matchesControllers.update(req, res));
router.post('/', validateToken, (req, res) => matchesControllers.createMatche(req, res));

export default router;
