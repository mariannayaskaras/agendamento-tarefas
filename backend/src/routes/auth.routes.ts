import { Router } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // desafio introdutório: login "fake"
  if (username === 'admin' && password === 'admin') {
    const token = jwt.sign({ userId: 'admin' }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    return res.json({ token });
  }

  return res.status(401).json({ message: 'Credenciais inválidas' });
});

export default router;
