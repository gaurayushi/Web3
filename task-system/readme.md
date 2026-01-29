# Task Management System (Node.js + TypeScript + SQL + Next.js)

A secure task management system with:
- User Registration / Login / Logout
- JWT Access Token (short-lived) + Refresh Token (long-lived via HttpOnly cookie)
- Task CRUD (Create, Read, Update, Delete)
- Pagination + Search (by title) + Filter (by status)

---

## Tech Stack
- Backend: Node.js + TypeScript + SQL (Prisma/TypeORM)
- Frontend: Next.js (App Router) + TypeScript + Tailwind CSS

---

## Base URLs
- Backend API: http://localhost:4000
- Frontend: http://localhost:3000

---

## Health Check

### GET /health
Request:
GET http://localhost:4000/health

Response:
{ "ok": true }

---

## Authentication

### POST /auth/register
Request:
POST http://localhost:4000/auth/register
Content-Type: application/json

Body:
{
  "name": "Test User",
  "email": "test@gmail.com",
  "password": "123456"
}

### POST /auth/login
Request:
POST http://localhost:4000/auth/login
Content-Type: application/json

Body:
{
  "email": "test@gmail.com",
  "password": "123456"
}

Expected:
- Returns accessToken in JSON
- Sets refresh token as HttpOnly cookie (recommended)

### POST /auth/refresh
Uses refresh token cookie to issue a new access token.

Request:
POST http://localhost:4000/auth/refresh

### POST /auth/logout
Clears refresh token cookie (and invalidates server-side if stored).

Request:
POST http://localhost:4000/auth/logout

---

## Tasks (Protected)

All /tasks routes require:
Authorization: Bearer <ACCESS_TOKEN>

### GET /tasks (Pagination + Search + Filter)

Query params:
- page (default: 1)
- limit (default: 10)
- search (optional: searches title)
- status (optional: PENDING | COMPLETED)

Examples:
- /tasks?page=1&limit=6
- /tasks?page=1&limit=6&search=math
- /tasks?page=1&limit=6&status=PENDING
- /tasks?page=1&limit=6&search=math&status=COMPLETED

### POST /tasks (Create Task)
Body:
{
  "title": "Finish assignment",
  "description": "Submit by 6 PM"
}

### PATCH /tasks/:id (Update Task)
Body:
{
  "title": "Updated title",
  "description": "Updated description"
}

### DELETE /tasks/:id (Delete Task)
Deletes a task by id.

### POST /tasks/:id/toggle (Toggle Status)
Toggles:
- PENDING -> COMPLETED
- COMPLETED -> PENDING

---

## cURL Examples

### Health
curl http://localhost:4000/health

### Register
curl -X POST http://localhost:4000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@gmail.com","password":"123456"}'

### Login (save cookies)
curl -i -c cookies.txt -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@gmail.com","password":"123456"}'

### Refresh (use cookies)
curl -i -b cookies.txt -X POST http://localhost:4000/auth/refresh

### Get tasks (replace ACCESS_TOKEN)
curl "http://localhost:4000/tasks?page=1&limit=6&search=math&status=PENDING" \
  -H "Authorization: Bearer ACCESS_TOKEN"

---

## Environment Variables

### Backend .env
PORT=4000
DATABASE_URL="YOUR_SQL_DATABASE_URL"
JWT_ACCESS_SECRET="your_access_secret"
JWT_REFRESH_SECRET="your_refresh_secret"
ACCESS_TOKEN_EXPIRES_IN="15m"
REFRESH_TOKEN_EXPIRES_IN="7d"
CORS_ORIGIN="http://localhost:3000"

### Frontend .env.local
NEXT_PUBLIC_API_URL=http://localhost:4000

---

## Run Locally

### Backend
cd backend
npm install
npm run dev

### Frontend
cd frontend
npm install
npm run dev

---

## Notes
- Refresh token should be stored in a HttpOnly cookie for security.
- Frontend requests should use withCredentials: true so cookies work.
- Backend CORS should allow credentials and origin:
  - origin: http://localhost:3000
  - credentials: true
