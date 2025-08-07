import { useEffect, useState } from 'react';
import api from './services/api';
import TaskForm from './components/TaskForm';

type Task = { id: string; title: string; description: string; scheduledTime: string };

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch {
      setError('Não foi possível carregar as tarefas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(120deg, #232526 0%, #414345 100%)',
        color: '#fff',
        fontFamily: 'sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* Conteúdo central */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        minHeight: '100vh',
      }}>
        <h1 style={{ fontSize: 48, fontWeight: 700, margin: '32px 0 24px 0', textAlign: 'center' }}>
          Agendamento de Tarefas
        </h1>
        <div style={{
          background: '#232526',
          borderRadius: 16,
          boxShadow: '0 2px 16px #0003',
          padding: 40,
          width: 400,
          maxWidth: '90vw',
          margin: '0 auto',
        }}>
          <TaskForm onTaskCreated={fetchTasks} />
        </div>
      </div>
      {/* Barra lateral */}
      <aside
        style={{
          width: 380,
          minWidth: 320,
          maxWidth: '30vw',
          height: '100vh',
          background: 'rgba(24,25,26,0.98)',
          boxShadow: '-2px 0 16px #0003',
          padding: '48px 32px 32px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          overflowY: 'auto',
        }}
      >
        <h2 style={{ marginTop: 0, marginBottom: 24, fontSize: 28 }}>Tarefas Agendadas</h2>
        {loading && <p>Carregando...</p>}
        {error && <p style={{ color: 'salmon' }}>{error}</p>}
        {!loading && tasks.length === 0 && <p>Nenhuma tarefa cadastrada.</p>}
        <ul style={{ paddingLeft: 0, width: '100%' }}>
          {tasks.map(t => (
            <li
              key={t.id}
              style={{
                marginBottom: 24,
                background: '#232526',
                borderRadius: 8,
                padding: '16px 20px',
                boxShadow: '0 1px 6px #0002',
                listStyle: 'none',
                width: '100%',
              }}
            >
              <strong style={{ fontSize: 18 }}>{t.title}</strong><br />
              <span style={{ color: '#ccc' }}>{t.description}</span><br />
              <small style={{ color: '#aaa' }}>{new Date(t.scheduledTime).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
