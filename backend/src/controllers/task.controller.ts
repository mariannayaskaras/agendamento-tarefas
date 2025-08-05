import { Request, Response } from 'express';
import { getTasks, saveTask } from '../services/task.service';
import { v4 as uuidv4 } from 'uuid';

export function listTasks(req: Request, res: Response) {
  const tasks = getTasks();
  res.json(tasks);
}

export function createTask(req: Request, res: Response) {
  const { title, description, scheduledTime } = req.body;

  if (!title || !description || !scheduledTime) {
    return res.status(400).json({ message: 'Campos obrigatórios: título, descrição e horário.' });
  }

  const taskDate = new Date(scheduledTime);
  const now = new Date();

  if (taskDate < now) {
    return res.status(400).json({ message: 'Não é possível agendar tarefas no passado.' });
  }

  const task = {
    id: uuidv4(),
    title,
    description,
    scheduledTime
  };

  saveTask(task);
  res.status(201).json(task);
}
