import { useEffect, useState } from 'react'
import api from '../services/api'

type Task = {
  id: string
  title: string
  description: string
  scheduledTime: string
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    api.get('/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Erro ao buscar tarefas:', error))
  }, [])

  return (
    <div>
      <h2>Tarefas Agendadas</h2>
      {tasks.length === 0 ? (
        <p>Nenhuma tarefa cadastrada.</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <strong>{task.title}</strong><br />
              {task.description}<br />
              <em>{new Date(task.scheduledTime).toLocaleString()}</em>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
