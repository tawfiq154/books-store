<div align="center">
  <h1>📚 Books API — Library Ecosystem</h1>
  <p><strong>A sleek, modern full-stack book catalog built with the MERN stack.</strong></p>

  <p>
    <img alt="React" src="https://img.shields.io/badge/React-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
    <img alt="Node.js" src="https://img.shields.io/badge/Node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"/>
    <img alt="Express.js" src="https://img.shields.io/badge/Express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/>
    <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white"/>
    <img alt="Vite" src="https://img.shields.io/badge/Vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white"/>
    <img alt="Vercel" src="https://img.shields.io/badge/Vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white"/>
  </p>
</div>

<br />

Welcome to the **Books API Library**, a robust and beautiful full-stack educational project offering a premium React interface, an Express REST API, and an intuitive MongoDB database administration dashboard.

## 🏗️ Architecture & Structure

| Folder | Tech Stack | Role | Port |
|---------|-------------|------|------|
| `backend/` | **Express / Mongoose** | Core API (`/livres`, `/categories`) | **3000** |
| `frontend/atelier/` | **React / Vite** | Web App Interface | **5173** |
| `mongo-express-app/` | **[Mongo Express](https://github.com/mongo-express/mongo-express)** | Database Admin UI | **8081** |

---

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed before proceeding:
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) running locally on port `27017`

---

### Step-by-Step Installation

#### 1. Setup the Database & Seed Demo Data
```bash
cd mongo-express-app
npm install
npm run seed
```

#### 2. Start the Backend API
```bash
cd backend
npm install
npm run dev
```

#### 3. Launch the Frontend Interface
```bash
cd frontend/atelier
npm install
npm run dev
```

#### 4. (Optional) Start Mongo Express Admin
```bash
cd mongo-express-app
npm start
```
*Open http://localhost:8081 — credentials are located in `mongo-express-app/config.env` (`admin` / `admin123`)*

---

## ⚙️ Environment Variables

- **Local Development**: `MONGODB_URI` is optional. Defaults to `mongodb://127.0.0.1:27017/bibliotheque`
- **Production / Vercel**: You MUST set `MONGODB_URI` (e.g. your MongoDB Atlas connection string).
- **Core App Routing**: All API calls from the frontend fetch from **`/api`**. In development, the Vite proxy forwards this to port `3000`.

---

## ☁️ Deployment

This project is perfectly tailored to be deployed as a Mono-repo directly on **Vercel**. 

See **[docs/VERCEL.md](./docs/VERCEL.md)** for detailed instructions on the root build, serverless API execution, and configuring `MONGODB_URI`.

---

## 📜 License
*Educational / demonstration project.*
