
# 📋 Agendamento de Tarefas

Aplicação completa para agendamento de tarefas, com backend em Node.js/Express/TypeScript e frontend em React. Notificações são simuladas via webhook 5 minutos antes do horário agendado, usando BullMQ e Redis.

---

## 🚀 Tecnologias

- **Backend:** Node.js, Express, TypeScript, BullMQ, Redis
- **Frontend:** React, Vite, TypeScript
- **Testes:** Jest, Supertest
- **Containerização:** Docker & Docker Compose

---

## 📦 Como rodar o projeto

### Pré-requisitos

- Node.js 18+
- Docker e Docker Compose

### 1. Clone o repositório

```bash
git clone https://github.com/mariannayaskaras/agendamento-tarefas.git
cd agendamento-tarefas
```

### 2. Instale as dependências

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 3. Rode com Docker Compose (recomendado)

```bash
cd ..
docker-compose up --build
```

- Backend: http://localhost:3000
- Frontend: http://localhost:5173

---

## ✅ Funcionalidades

- Listagem e cadastro de tarefas (título, descrição, data/hora)
- Validação de data/hora (não permite tarefas no passado)
- Autenticação JWT para cadastro de tarefas (login: usuário `admin`, senha `admin`)
- Notificação via webhook 5 minutos antes do horário agendado (configure `WEBHOOK_URL` no backend)
- Processamento assíncrono com BullMQ e Redis
- Testes automatizados (Jest)

---

## 🔍 Testes

```bash
cd backend
npm run test
```

---

## 📁 Estrutura de Pastas

```
agendamento-tarefas/
├── backend/
│   ├── src/
│   ├── __tests__/
│   └── docker-compose.yml
├── frontend/
│   └── src/
```

---

## 💡 Observações

- As tarefas são armazenadas em arquivo JSON (`tasks.json`) no backend.
- O frontend consome a API para listar e cadastrar tarefas.
- Para cadastrar, obtenha o token JWT via `/auth/login` e cole no campo "Token" do formulário.
- O webhook recebe um POST 5 minutos antes do horário agendado da tarefa.
Dentro da pasta `backend`:



