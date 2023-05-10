import { Router } from 'express';


const router = Router();

router.use('teams', teamsRouter);

export default router;