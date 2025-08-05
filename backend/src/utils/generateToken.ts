import jwt from 'jsonwebtoken';

const payload = {
  userId: 'teste-123'
};

const secret = 'supersecreta123'; // mesmo valor do .env
const token = jwt.sign(payload, secret, { expiresIn: '1h' });

console.log('Seu token JWT:');
console.log(token);
