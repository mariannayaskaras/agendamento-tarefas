import { useState } from 'react';
import api from '../services/api';

export function TaskForm({ onTaskCreated }: { onTaskCreated: () => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post('/tasks', {
        title,
        description,
        scheduledTime
      });

      // Limpa o formulário
      setTitle('');
      setDescription('');
      setScheduledTime('');

      onTaskCreated(); // recarrega a lista no componente pai
    } catch (error) {
      alert('Erro ao cadastrar tarefa. Verifique os campos.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <h2>Nova Tarefa</h2>

      <div>
        <label>Título</label><br />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Descrição</label><br />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Data e Hora</label><br />
        <input
          type="datetime-local"
          value={scheduledTime}
          onChange={(e) => setScheduledTime(e.target.value)}
          required
        />
      </div>

      <button type="submit">Agendar Tarefa</button>
    </form>
  );
}
