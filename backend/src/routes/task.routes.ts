import { Router } from 'express';
import { listTasks, createTask } from '../controllers/task.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', listTasks);
router.post('/', authenticateJWT, createTask);

export default router;
