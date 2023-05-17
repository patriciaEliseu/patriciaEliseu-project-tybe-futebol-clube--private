import * as express from 'express';
import MatchesControllers from '../controllers/MatchesControllers';
// import validateToken from '../middlewares/validateToken';

const router = express.Router();

const matchesControllers = new MatchesControllers();

router.get('/', (req, res) => matchesControllers.getAllMatches(req, res));
// router.patch('/:id/finish', validateToken, matchesControllers.finish);
// router.patch('/:id', validateToken, matchesControllers.update);
// router.post('/', validateToken, matchesControllers.createMatche);

export default router;
