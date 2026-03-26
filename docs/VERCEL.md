# Deploy on Vercel

This repository is ready for a **single Vercel project**: React site (Vite build) + Express API as a **serverless function** under `/api`.

## Prerequisites

1. Account on [Vercel](https://vercel.com)
2. **Online MongoDB** database (e.g., [MongoDB Atlas](https://www.mongodb.com/atlas) — free tier): `mongodb+srv://...`

> `localhost:27017` does not work on Vercel: a cloud URI is required.

## Steps

### 1. Import the project

1. [New Project](https://vercel.com/new) → import the GitHub repo `books-api`
2. **Root Directory**: leave as **`.`** (root of the repo, where `vercel.json` is located)
3. Framework Preset: **Other** (already overridden by `vercel.json`)

### 2. Environment Variables

In **Settings → Environment Variables**, add:

| Name | Value | Environments |
|-----|--------|----------------|
| `MONGODB_URI` | Atlas connection string (or other hosted Mongo) | Production, Preview |

Do not commit the URI in the code.

### 3. Build

Vercel runs:

- `installCommand`: `backend` + `frontend/atelier` dependencies
- `buildCommand`: `npm run build` in the frontend
- Routes `/api/*` are served by `api/index.mjs` (serverless)

### 4. After deployment

- **Site**: `https://your-project.vercel.app`
- **API**: `https://your-project.vercel.app/api/livres`, `/api/categories`, etc.

The frontend uses `baseURL = '/api'` by default (same domain).  
For an external API only, set **`VITE_API_URL`** in Vercel (e.g., `https://other-domain.com/api`) and **rebuild**.

## Troubleshooting

- **503 Database**: check `MONGODB_URI` and the Atlas IP whitelist (**0.0.0.0/0** to test).
- **404 on React routes**: the SPA rewrite in `vercel.json` must remain after the `/api` rule.
- **Function timing out**: increase `maxDuration` in `vercel.json` (Pro plan required for > 10s in prod).

## Local Development

```bash
# Terminal 1 — Local MongoDB or Atlas
cd backend && npm run dev

# Terminal 2
cd frontend/atelier && npm run dev
```

The Vite proxy forwards `/api` to `http://localhost:3000`.
