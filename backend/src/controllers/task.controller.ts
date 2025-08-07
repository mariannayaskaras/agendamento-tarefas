// ... imports existentes

import queue from '../jobs/queue'; // ⬅️ ADICIONE
import crypto from 'crypto';
import { Request, Response } from 'express';
// Lista tarefas (exemplo básico lendo de arquivo JSON)
import fs from 'fs';
import path from 'path';

export const listTasks = (req: Request, res: Response) => {
  const filePath = path.join(__dirname, '../database/tasks.json');
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const tasks = JSON.parse(data);
    return res.json(tasks);
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao ler tarefas.' });
  }
};

// torne a função async
export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, scheduledTime } = req.body;

    if (!title || !description || !scheduledTime) {
      return res.status(400).json({ message: 'title, description e scheduledTime são obrigatórios' });
    }

    const runAt = new Date(scheduledTime).getTime();
    if (Number.isNaN(runAt)) {
      return res.status(400).json({ message: 'scheduledTime inválido' });
    }
    if (runAt <= Date.now()) {
      return res.status(400).json({ message: 'scheduledTime precisa ser no futuro' });
    }

    // ➜ salve a tarefa como você já faz hoje (em arquivo/array/db)
    const task = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      title,
      description,
      scheduledTime: new Date(scheduledTime).toISOString(),
      createdAt: new Date().toISOString(),
    };


    // Salvar tarefa no arquivo tasks.json
    const filePath = path.join(__dirname, '../database/tasks.json');
    let tasks: any[] = [];
    try {
      if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf-8');
        tasks = JSON.parse(data);
      }
    } catch (err) {
      console.error('Erro ao ler tasks.json:', err);
    }
    tasks.push(task);
    try {
      fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
    } catch (err) {
      console.error('Erro ao salvar tasks.json:', err);
      return res.status(500).json({ message: 'Erro ao salvar tarefa.' });
    }

    // ➜ Agendar notificação 5 min antes
    const FIVE_MIN = 5 * 60 * 1000;
    const delay = Math.max(0, runAt - Date.now() - FIVE_MIN);

    await queue.add('notify', task, { delay });

    return res.status(201).json(task);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro ao criar tarefa' });
  }
};
