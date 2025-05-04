# Simple Product Manager API & Frontend (Node.js + Express + React + TypeScript)

This is a simple Product Manager project built with **Node.js (Express)** for the backend RESTful API and **React (with TypeScript)** for the frontend UI, using **Vite** for fast development. It allows users to view, add, update, and delete tasks.

## 🛠️ Tech Stack

- **Backend:**
  - Node.js
  - Express.js
  - TypeScript
- **Frontend:**
  - React
  - TypeScript
  - Vite

## 📚 Features

✅ View all products  
✅ Add a new product  
✅ Update an existing product
✅ Delete a product

## 🚀 How It Works

### 1. Backend
- The server exposes RESTful API endpoints under `/api/items`.
- The data is temporarily stored in-memory (array).
- API Endpoints:
  - `GET /api/items` → get all tasks
  - `POST /api/items` → create a new task
  - `PUT /api/items/:id` → update a task
  - `DELETE /api/items/:id` → delete a task

### 2. Frontend
- Uses `fetch` to connect to the backend API.
- Displays tasks in a list.
- Provides buttons to add, edit, and delete tasks.
- Updates UI in real-time without page refresh.

## 📝 Installation

### 1. Clone the repository
```bash
git clone https://github.com/cheetah5900/task-manager
cd task-manager
```

### 2. Install backend dependencies
```bash
npm install
```

### 3. Compile backend TypeScript
```bash
cd server
tsc
```

### 4. Run backend server (compiled JavaScript)
```bash
node dist/server.js
```
By default, it runs on http://localhost:3000.

### 5. Setup frontend (inside 'react-app' folder)
```bash
cd react-app
npm run dev
```
Frontend will run on http://localhost:5173 by default.
