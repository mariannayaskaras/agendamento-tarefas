import fs from 'fs';
import path from 'path';

const dbPath = path.join(__dirname, '../database/tasks.json');

interface Task {
  id: string;
  title: string;
  description: string;
  scheduledTime: string;
}

export function getTasks(): Task[] {
  const data = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(data);
}

export function saveTask(task: Task): void {
  const tasks = getTasks();
  tasks.push(task);
  fs.writeFileSync(dbPath, JSON.stringify(tasks, null, 2));
}
