# Sales Dashboard

A full-stack Sales Dashboard built with **React + Vite** (frontend) and **Express** (backend).  
Shows interactive charts for sales, orders, and customers by category.

## Live Demo

- **Frontend**: (add your Vercel URL here after deployment)
- **Backend**: (add your Railway/Render URL here after deployment)

## Architecture Overview

```
Sales-Dashboard/
├── client/          → React + Vite + Recharts (Frontend)
└── server/          → Express API (Backend)
```

- **Frontend**: React 18, Vite, Recharts
- **Backend**: Node.js + Express
- **Data**: Hardcoded sample sales data (months + categories)
- **Hosting recommendation**:
  - Frontend → Vercel
  - Backend → Railway or Render

## Features

- Live data from backend API
- Filter by category
- Bar chart, Line chart, Pie chart
- Responsive (works on mobile + desktop)
- Basic SEO (title + meta description)

## Setup Instructions (Local)

### 1. Backend

```bash
cd server
npm install
npm start
```

Backend runs at: http://localhost:3000

### 2. Frontend

```bash
cd client
npm install
npm run dev
```

Frontend runs at: http://localhost:5173

### Environment Variables

| Variable       | Where     | Description                          |
|----------------|-----------|--------------------------------------|
| `PORT`         | Backend   | Port for the server (default 3000)   |
| `VITE_API_URL` | Frontend  | Backend API URL (for production)     |

In production (Vercel), set:

```
VITE_API_URL=https://your-backend-url.up.railway.app
```

## API Endpoints

| Method | Endpoint          | Description              |
|--------|-------------------|--------------------------|
| GET    | `/`               | Health check             |
| GET    | `/api/dashboard`  | Returns sales dashboard data |

## How to Deploy

### Backend (Railway)

1. Push this repo to GitHub
2. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
3. Select the `server` folder as root directory (or deploy whole repo and set root to `/server`)
4. Railway will give you a public URL

### Frontend (Vercel)

1. Go to [vercel.com](https://vercel.com) → New Project → Import your GitHub repo
2. Set **Root Directory** to `client`
3. Add Environment Variable:
   - Key: `VITE_API_URL`
   - Value: your Railway backend URL (e.g. `https://xxx.up.railway.app`)
4. Deploy

## Author

Created as a full-stack project for learning deployment, SEO, and performance optimization.
