import request from 'supertest';
import app from '../src/app'; // ajuste o caminho se for necessário
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecreta123';

const token = jwt.sign({ userId: 'test-user' }, JWT_SECRET, { expiresIn: '1h' });

describe('API de Tarefas', () => {
  it('deve retornar 200 ao buscar tarefas', async () => {
    const res = await request(app)
      .get('/tasks')
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
