# Books API — Library (MongoDB + Express + React)

Full-stack project: book catalog with categories, React interface, and MongoDB administration.

## Structure

| Folder | Role |
|---------|------|
| `backend/` | Express API + Mongoose (`/livres`, `/categories`) — port **3000** |
| `frontend/atelier/` | React Interface (Vite) — port **5173** |
| `mongo-express-app/` | [Mongo Express](https://github.com/mongo-express/mongo-express) — port **8081** |

## Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) local (port 27017)

## Quick Start

### 1. Database & Seed

```bash
cd mongo-express-app
npm install
npm run seed
```

### 2. API

```bash
cd backend
npm install
npm run dev
```

### 3. Frontend

```bash
cd frontend/atelier
npm install
npm run dev
```

### 4. (Optional) Mongo Express

```bash
cd mongo-express-app
npm start
```

Open http://localhost:8081 — credentials in `mongo-express-app/config.env`.

## Environment Variables

- **Local**: `MONGODB_URI` optional, default `mongodb://127.0.0.1:27017/bibliotheque`
- **Vercel**: Set `MONGODB_URI` (MongoDB Atlas or other) — required in production.
- Frontend: API calls under **`/api`** (e.g. `/api/livres`). In dev, Vite proxy → port 3000.

## Vercel Deployment

See **[docs/VERCEL.md](./docs/VERCEL.md)** (root build + serverless function + `MONGODB_URI`).

## License

Educational / demonstration project.
