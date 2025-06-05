# 🍳 CozinhAI

![Banner do projeto](frontend/public/banner/CozinhAI%20banner.png)

CozinhAI é uma plataforma inteligente de receitas, que utiliza Inteligência Artificial para criar receitas personalizadas.  
Este projeto foi desenvolvido para a disciplina de Gerenciamento de Projetos (2025 - UEPB) e conta com:

- Backend: Node.js + Express + Prisma + PostgreSQL  
- Frontend: React + TypeScript + Vite

## 🚀 Funcionalidades

- Autenticação de usuários (incluindo OAuth via Google/Supabase)
- Criação, edição e exclusão de receitas
- Geração de receitas com IA (Google Gemini)
- Curtir e favoritar receitas
- Listagem de receitas da comunidade e do usuário
- Perfil com estatísticas (receitas criadas, favoritas, etc.)
- Interface moderna e responsiva

## 📁 Estrutura do Projeto

```bash
cozinhAI/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   ├── package.json
│   └── tsconfig.json
│
├── docs/
│   ├── Arquitetura CozinhAI.pdf
│   └── Visão de Produto - CozinhAI.pdf
│
└── README.md
```

## ⚙️ Como Rodar o Projeto

### ✅ Pré-requisitos

- Node.js (v18+)
- PostgreSQL
- Conta no Supabase (opcional, para autenticação OAuth)

### 🖥️ Backend

```bash
cd backend
npm install
# configure o arquivo .env com base no .env.example
npx prisma migrate dev
npm run dev
```

> O backend estará disponível em: http://localhost:3333

### 💻 Frontend

```bash
cd frontend
npm install
# configure o arquivo .env com base no .env.example
npm run dev
```

> O frontend estará disponível em: http://localhost:5173

## 📄 Documentação

- [📘 Arquitetura CozinhAI](docs/Arquitetura%20CozinhAI.pdf)
- [📕 Visão de Produto - CozinhAI](docs/Vis%C3%A3o%20de%20Produto%20-%20CozinhAI.pdf)

## 🧰 Tecnologias Utilizadas

Frontend:
- React
- TypeScript
- Vite
- TailwindCSS

Backend:
- Node.js
- Express
- Prisma
- PostgreSQL

Integrações:
- Google Gemini API (IA)
- Supabase Auth (OAuth)
- ESLint
- Vercel / Render (deploy sugerido)

## 📜 Scripts Úteis

### Backend

```bash
npm run dev          # Inicia o servidor em modo desenvolvimento  
npx prisma studio    # Interface visual do banco de dados  
```

### Frontend

```bash
npm run dev          # Inicia o frontend em modo desenvolvimento  
npm run build        # Gera a build de produção  
```

## 👨‍💻 Autor

Projeto desenvolvido por Esly Caetano para a disciplina de Gerenciamento de Projetos — 2025.
