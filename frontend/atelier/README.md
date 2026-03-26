# Library Frontend (React + Vite)

This is the React frontend for the **bibliotheque** (Library) application, built with Vite.

## Prerequisites

- Node.js installed
- Running the Backend API (on port 3000)

## Installation

```bash
npm install
```

## Running the Application

To start the development server:

```bash
npm run dev
```

The application will be available at **http://localhost:5173**.

## API Connection

In development, API requests starting with `/api` are implicitly proxied to the backend server running on port 3000. This is configured in `vite.config.js`. Please make sure that both the frontend and your Express backend are running concurrently for the app to function properly.
