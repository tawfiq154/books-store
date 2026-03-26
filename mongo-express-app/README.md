# Mongo Express App - Library

Web interface to manage the **bibliotheque** MongoDB database.

## Prerequisites

- MongoDB installed and running (port 27017)
- Node.js

## Installation

```bash
npm install
```

## Usage

### 1. Start Mongo Express (web interface)

In a terminal:

```bash
cd mongo-express-app
npm start
```

Then in the browser, open:

**http://localhost:8081**

An authentication prompt will appear (Basic Auth):

- **User:** `admin`  
- **Password:** `admin123`

Then you will see the list of databases; click on **`bibliotheque`** and then on the collections **`livres`** or **`categories`**.

### 2. Populate the database (seed)

Run once to create the `bibliotheque` database with demo data:

```bash
npm run seed
```

This creates:
- **Collection categories**: Novel, Science Fiction, Biography, History, Development
- **Collection livres**: 8 example books

## Database Structure

| Collection   | Fields                                         |
|-------------|-------------------------------------------------|
| **categories** | nom, description                             |
| **livres**     | titre, auteur, categorie                      |
