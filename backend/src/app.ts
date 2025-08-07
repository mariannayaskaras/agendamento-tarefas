// backend/src/app.ts
import express from 'express';
import cors from 'cors';

import taskRoutes from './routes/task.routes';
import authRoutes from './routes/auth.routes'; // ⬅️ ADICIONE ISTO

const app = express();

app.use(cors());
app.use(express.json());

// rotas
app.use('/auth', authRoutes);   // ⬅️ ADICIONE ISTO (gera /auth/login)
app.use('/tasks', taskRoutes);  // já existente

export default app;
