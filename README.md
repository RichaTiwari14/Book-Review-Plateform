# Book-Review-Plateform
Book Review Platform (MERN)
A full‑stack Book Review Platform where users can sign up, log in, add books, and write reviews with star ratings. Built with MongoDB, Express, React, and Node.js (MERN) with JWT auth and clean REST APIs.

Status: Active
Difficulty: Intermediate
Deadline: October 5, 2025
✨ Features
JWT Authentication (Signup/Login) with bcrypt password hashing
Books: Create, Read, Update (owner only), Delete (owner only)
Reviews: One review per user per book (upsert), edit/delete own
Pagination: 5 books per page
Search/filter by title/author, genre (optional)
Average rating computed on book details
Protected routes (client + server)
Ready for MongoDB Atlas
🧱 Tech Stack
Frontend: React, React Router, Context API, Axios (Create React App)
Backend: Node.js, Express, MongoDB (Mongoose), JWT, bcrypt, CORS, morgan
Database: MongoDB Atlas (recommended) or Local MongoDB
📦 Monorepo Structure
text

/backend
  └─ src/
     ├─ config/db.js
     ├─ models/ (User, Book, Review)
     ├─ middleware/ (auth, error)
     ├─ controllers/ (auth, book, review)
     ├─ routes/ (auth, book, review)
     ├─ utils/asyncHandler.js
     ├─ app.js
     └─ server.js
/frontend
  └─ src/
     ├─ api/axios.js
     ├─ context/AuthContext.jsx
     ├─ components/ (Navbar, ProtectedRoute)
     ├─ pages/ (Signup, Login, BookList, BookDetails, AddEditBook, NotFound)
     ├─ App.jsx
     └─ index.js
🚀 Quick Start (Local)
Prereqs:

Node 18+ (tested with Node 22)
MongoDB Atlas connection string (or local MongoDB)
1) Backend
Install deps

text

cd backend
npm i
Create .env

text

PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/bookreview?retryWrites=true&w=majority&appName=<ClusterName>
JWT_SECRET=super_strong_secret
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
Notes:

Use your Atlas connection string and add a DB name (bookreview) in the path.
Atlas: Add DB user + whitelist IP 0.0.0.0/0 (for dev).
Run

text

npm run dev
Visit health: http://localhost:5000/api/health -> {"ok": true}

2) Frontend (CRA)
Install deps

text

cd ../frontend
npm i
Create .env (CRA requires REACT_APP_ prefix)

text

REACT_APP_API_URL=http://localhost:5000/api
Start

text

npm start
App: http://localhost:3000

Optional (CORS‑free dev): Add a proxy to frontend/package.json

JSON

{
  "proxy": "http://localhost:5000"
}
Then set axios baseURL to "/api" (relative). This avoids CORS during local dev.

🔐 Authentication
Passwords hashed via bcrypt
JWT returned on login/signup; stored in localStorage on client
Protected API routes require Authorization: Bearer <token>
Client protected views are gated via ProtectedRoute
📚 API Documentation (REST)
Base URL (local): http://localhost:5000/api

Auth

POST /auth/signup
body: { name, email, password }
201: { user, token }
POST /auth/login
body: { email, password }
200: { user, token }
GET /auth/me (auth)
200: { user }
Books

GET /books?page=1&limit=5&q=harry&genre=fantasy&sort=-createdAt
200: { data: Book[], pagination: { page, limit, total, pages } }
GET /books/:id
200: { ...book, averageRating, reviewsCount, reviews: Review[] }
POST /books (auth)
body: { title, author, description?, genre?, year? }
201: Book
PUT /books/:id (auth, owner only)
body: updatable fields (title, author, description, genre, year)
200: Book
DELETE /books/:id (auth, owner only)
200: { message: "Book deleted" }
Reviews

POST /books/:bookId/reviews (auth)
upsert user’s review for that book
body: { rating: 1-5, reviewText? }
201: Review
PUT /reviews/:id (auth, owner only)
body: { rating?, reviewText? }
200: Review
DELETE /reviews/:id (auth, owner only)
200: { message: "Review deleted" }
Sample curl (signup)

text

curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"secret123"}'
🗄️ Database Schema
User

name: String, required
email: String, required, unique
password: String (hashed)
timestamps
Book

title: String, required
author: String, required
description: String
genre: String
year: Number
addedBy: ObjectId(User), required
timestamps
Review

bookId: ObjectId(Book), required
userId: ObjectId(User), required
rating: Number (1–5), required
reviewText: String
unique index: (bookId, userId) to allow only one review per user per book
timestamps
Average rating is computed dynamically in GET /books/:id using an aggregate.

🧭 Frontend Routes
/ — Book list (pagination + optional search)
/books/:id — Book details + reviews + average rating
/books/new — Add book (protected)
/books/:id/edit — Edit book (protected; owner only)
/signup — Register
/login — Login
404 — NotFound
⚙️ Scripts
Backend

dev: nodemon src/server.js
start: node src/server.js
Frontend

start: react-scripts start
build: react-scripts build
☁️ Deployment
Backend (Render/Heroku/Fly)

Set env vars: MONGO_URI, JWT_SECRET, JWT_EXPIRES_IN, CORS_ORIGIN=<your frontend URL>
Start command: node src/server.js
Health endpoint: /api/health
Frontend (Vercel/Netlify)

Env var: REACT_APP_API_URL=https://<your-backend-host>/api
Build: react-scripts build
Output: build/
🔍 Troubleshooting
“Network Error” on browser requests

Backend running? http://localhost:5000/api/health
CORS: set CORS_ORIGIN=http://localhost:3000 and configure app.use(cors({ origin: [that origin], allowedHeaders: ["Content-Type","Authorization"], methods: ["GET","POST","PUT","DELETE","OPTIONS"] }))
OR use CRA proxy and set axios baseURL to "/api"
MongoDB connection fails

Atlas: add DB user, whitelist IP 0.0.0.0/0
Ensure DB name in URI path: /bookreview
Password with special chars? Use URL-encoding
CRA env variables not picked up

Use REACT_APP_API_URL (must start with REACT_APP_)
Restart dev server after .env changes
ESM import errors

Ensure package.json has "type": "module"
Always include .js in import paths (e.g., "../models/User.js")
🧪 Postman
Optional: import a collection with these endpoints:

POST /api/auth/signup
POST /api/auth/login
GET /api/auth/me
GET /api/books (with page=1&limit=5)
POST /api/books (auth)
POST /api/books/:bookId/reviews (auth)
🗺️ Roadmap (Bonus)
Rating distribution chart on Book Details (Recharts)
Search/sort UI (by rating/year)
Dark/Light mode
Deployed links in README (Render + Vercel)
E2E tests (Cypress) and unit tests (Jest)
📄 License
MIT — feel free to use, modify, and distribute.

👤 Author
Your Name — honeyt140208@gmail.com
