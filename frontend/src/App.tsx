import { useEffect, useState } from 'react';
import api from './services/api';
import { TaskForm } from './components/TaskForm';

interface Task {
  id: string;
  title: string;
  description: string;
  scheduledTime: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    const res = await api.get('/tasks');
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Agendamento de Tarefas</h1>

      <TaskForm onTaskCreated={fetchTasks} />

      <h2>Tarefas Agendadas</h2>
      {tasks.length === 0 ? (
        <p>Nenhuma tarefa cadastrada.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <strong>{task.title}</strong><br />
              {task.description}<br />
              <em>
                {new Date(task.scheduledTime).toLocaleString('pt-BR')}
              </em>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
