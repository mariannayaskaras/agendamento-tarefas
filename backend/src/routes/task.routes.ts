import { Router } from 'express';
import { createTask, listTasks } from '../controllers/task.controller';
import { authenticateJWT } from '../middlewares/auth'; // seu middleware

const router = Router();

router.get('/', listTasks);            // aberto
router.post('/', authenticateJWT, createTask); // protegido

export default router;
