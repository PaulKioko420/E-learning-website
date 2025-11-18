**E-Learning Website**

A full-stack e-learning web application with an Express/MongoDB backend and a Vite + React frontend. The project supports user registration/login, role-based access (students/instructors), course CRUD for instructors, lesson uploads, and lesson progress tracking.

**Key Features**
- **Authentication**: JWT-based register/login and protected routes.
- **Roles**: `instructor` role for creating/updating/deleting courses and lessons.
- **Courses**: Create, read, update, delete courses with thumbnails and lessons (video uploads).
- **Progress Tracking**: Mark lessons as completed and fetch per-course progress.
- **Media Storage**: Cloudinary integration for storing thumbnails/videos (optional local `uploads/` fallback).

**Tech Stack**
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT, Cloudinary, Multer
- **Frontend**: React (Vite), Axios, React Router

**Live Demo**
- **URL**: https://rad-klepon-ca8d38.netlify.app 
- **Notes**: When you deploy the frontend, set `CLIENT_URL` in the backend `.env` to this URL so CORS and redirects work correctly.

**Repository Structure**
- **`backend/`**: Express server, routes, controllers and models
- **`frontend/`**: Vite + React application
- **`uploads/`**: Local uploads folder used by Multer (if not using Cloudinary)

**Quick Start (Windows PowerShell)**
1. Clone the repo and open the workspace root (where `backend/` and `frontend/` live).

2. Install dependencies

`cd backend; npm install`

`cd ../frontend; npm install`

3. Create environment files

Create a `.env` file in `backend/` with the following variables (example):

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/elearning
CLIENT_URL=http://localhost:5173
JWT_ACCESS_SECRET=your_jwt_secret_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

- **Notes**: If you do not want to use Cloudinary, you can keep `uploads/` local; Multer stores files in `uploads/` by default. If using Cloudinary, ensure those three `CLOUDINARY_*` env vars are set.

4. Run backend and frontend

Open two terminals (or use a multiplexer):

Terminal A (backend):
`cd backend; npm run dev`

Terminal B (frontend):
`cd frontend; npm run dev`

By default, the frontend runs on `http://localhost:5173` and the backend on `http://localhost:5000` (unless `PORT` overridden).

**Backend: Important Files & Scripts**
- **Entry**: `backend/src/server.js`
- **Start (dev)**: `npm run dev` runs `nodemon src/server.js`
- **Start (prod)**: `npm start` runs `node src/server.js`

**Frontend: Important Files & Scripts**
- **Entry**: `frontend/src/main.jsx`
- **Dev**: `npm run dev` (Vite)
- **Build**: `npm run build`

**Environment Variables (backend)**
- **`MONGODB_URI`**: MongoDB connection string.
- **`PORT`**: Port the backend listens on (default 5000).
- **`CLIENT_URL`**: Frontend origin for CORS (example: `http://localhost:5173`).
- **`JWT_ACCESS_SECRET`**: Secret key used to sign JWT tokens.
- **`CLOUDINARY_CLOUD_NAME`**, **`CLOUDINARY_API_KEY`**, **`CLOUDINARY_API_SECRET`**: Cloudinary credentials for uploading images/videos.

**API Routes (summary)**
- **Auth** (`/api/auth`)
  - `POST /register` — Register a new user; returns `{ token, user }`.
  - `POST /login` — Login; returns `{ token, user }`.
  - `GET /me` — Get current user profile (protected).

- **Courses** (`/api/courses`)
  - `GET /` — List courses.
  - `GET /:id` — Get a single course by id.
  - `POST /` — Create a course (protected, instructor only). Use `multipart/form-data` with `thumbnail` file.
  - `PUT /:id` — Update a course (protected, instructor only).
  - `DELETE /:id` — Delete a course (protected, instructor only).
  - `POST /:id/lessons` — Add a lesson to a course (protected, instructor only). Use `multipart/form-data` with `video` file.

- **Progress** (`/api/progress`)
  - `POST /:courseId/lesson/:lessonId/complete` — Mark a lesson as complete (protected).
  - `GET /:courseId` — Get progress for a user in a course (protected).

**Authentication & Authorization**
- The backend uses JWTs signed with `JWT_ACCESS_SECRET`.
- Some routes use the role middleware — pass a `role` field when registering users (e.g., `instructor`) to grant instructor privileges.

**Media (uploads & Cloudinary)**
- The backend uses `multer` to accept file uploads into `uploads/` by default.
- When Cloudinary env vars are set, the project uses the Cloudinary SDK (`backend/src/utils/cloudinary.js`) to upload and serve media.

**Development Tips**
- If you change backend env vars, restart the backend server.
- Use a REST client (Postman / Insomnia) to exercise protected endpoints; include `Authorization: Bearer <token>`.
- Check the `uploads/` directory for any files saved locally when Cloudinary is not configured.

**Deployment**
- Typical deployment steps:
  - Provision MongoDB (Atlas or managed DB) and set `MONGODB_URI`.
  - Configure Cloudinary (if needed) and set the `CLOUDINARY_*` env vars.
  - Build the frontend: `cd frontend; npm run build` and serve the static files with your preferred host (Vercel, Netlify, or a static server behind Nginx).
  - Start the backend: `npm start` (ensure Node and env vars are configured on the server).

**Contributing**
- Fork the repo, create a feature branch, and open a pull request. Keep changes focused and provide clear commit messages.

**Troubleshooting**
- `Mongo error` printed in backend logs: confirm `MONGODB_URI` is correct and reachable.
- `Invalid credentials` on login: ensure passwords are hashed on registration and use the correct email/password.

**License & Contact**
- This project is provided as-is; add a license file if you intend to open-source it publicly.

If you want, I can also:
- Add example `.env` files to `backend/` and `frontend/`.
- Add a `README-quickstart.md` with step-by-step screenshots or terminal logs.
