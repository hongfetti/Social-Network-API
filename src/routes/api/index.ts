import { Router } from 'express';
import { thoughtsRouter } from './thoughtsRoutes.js';
import { usersRouter } from './usersRoutes.js';

const router = Router();

router.use('/thoughts', thoughtsRouter);
router.use('/users', usersRouter);

export default router;
