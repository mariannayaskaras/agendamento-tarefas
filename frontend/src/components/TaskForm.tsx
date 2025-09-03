import { useState } from 'react';
import api from '../services/api';
import { authHeader } from '../services/api'; // garante que exportou essa função no api.ts

function TaskForm({ onTaskCreated }: { onTaskCreated: () => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [token, setToken] = useState('');        // ⬅️ NOVO
  const [loading, setLoading] = useState(false); // ⬅️ opcional
  const [error, setError] = useState<string | null>(null); // ⬅️ opcional

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // validação básica
    if (!title || !description || !scheduledTime) {
      setError('Preencha todos os campos.');
      return;
    }
    const runAt = new Date(scheduledTime).getTime();
    if (Number.isNaN(runAt) || runAt <= Date.now()) {
      setError('Data/hora inválida (precisa ser no futuro).');
      return;
    }

    try {
      setLoading(true);
      await api.post(
        '/tasks',
        { title, description, scheduledTime },
        { headers: authHeader(token) } // ⬅️ envia o JWT **apenas** aqui
      );

      // limpa o formulário
      setTitle('');
      setDescription('');
      setScheduledTime('');
      setToken('');

      onTaskCreated(); // recarrega a lista no componente pai
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Erro ao cadastrar tarefa. Verifique os campos.');
    } finally {
      setLoading(false);
    }
  };

  // opcional: evitar escolher tempo no passado pelo input
  const minDateTime = new Date(Date.now() + 60_000).toISOString().slice(0, 16);

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{ marginTop: 0 }}>Nova Tarefa</h2>
      <div style={{ marginBottom: 16 }}>
        <label>Título</label><br />
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label>Descrição</label><br />
        <input type="text" value={description} onChange={e => setDescription(e.target.value)} required />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label>Data e Hora</label><br />
        <input
          type="datetime-local"
          value={scheduledTime}
          min={minDateTime}
          onChange={e => setScheduledTime(e.target.value)}
          required
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label>Token (somente para cadastrar)</label><br />
        <input
          type="password"
          value={token}
          onChange={e => setToken(e.target.value)}
          placeholder="coloque o token aqui
        "
        />
      </div>

      {error && <p style={{ color: 'salmon' }}>{error}</p>}
      <button
        type="submit"
        disabled={loading}
        style={{
          background: '#111',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          padding: '10px 24px',
          fontWeight: 700,
          fontSize: 16,
          cursor: 'pointer',
          marginTop: 8
        }}
      >
        {loading ? 'Enviando...' : 'Agendar Tarefa'}
      </button>
    </form>
  );
}

export default TaskForm;
