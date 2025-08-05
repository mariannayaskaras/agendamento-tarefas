### 📄 `README.md` 

# 📋 Agendamento de Tarefas

Aplicação para agendamento de tarefas com **notificações simuladas**, utilizando **Node.js** no backend e **React** no frontend.

---

## 🚀 Tecnologias

- **Backend**: Node.js, Express, TypeScript  
- **Frontend**: React, Vite, TypeScript  
- **Testes**: Jest, Supertest  
- **Containerização**: Docker & Docker Compose  

---

## 📦 Como rodar o projeto

### 🔧 Requisitos

- Node.js 18+
- Docker e Docker Compose (caso queira rodar com containers)

---

## 🧪 Rodando localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/agendamento-tarefas.git
cd agendamento-tarefas
````

### 2. Instale as dependências

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

### 3. Inicie os serviços

#### Backend

```bash
npm run dev
```

#### Frontend

```bash
npm run dev
```

---

## 🐳 Rodando com Docker (somente backend)

```bash
cd backend
docker-compose up --build
```

A API estará disponível em: `http://localhost:3000`

---

## ✅ Funcionalidades

* [x] Listagem de tarefas
* [x] Cadastro de nova tarefa
* [x] Validação de data/hora (sem tarefas no passado)
* [x] Simulação de notificação
* [x] Testes automatizados (Jest)

---

## 🔍 Testes

Dentro da pasta `backend`:

```bash
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

* O backend utiliza `ts-node-dev` para desenvolvimento.
* As tarefas são armazenadas em memória (não persistem após reinício).
* O formulário no frontend valida campos antes de enviar.

```


