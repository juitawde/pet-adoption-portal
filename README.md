# PetMatch — Pet Adoption Portal

A light, image-rich, responsive full-stack B.Tech Backend Development case-study project.

**Live Deployed Link:**
https://pet-adoption-portal-1.onrender.com/

## Stack
- Frontend: React + Vite + React Router + Framer Motion + Lucide
- Backend: Node.js + Express.js
- Database: MongoDB + Mongoose
- Auth: JWT + Firebase-ready Auth integration
- Realtime: Socket.io
- Notifications: Firebase Admin / FCM-ready
- API docs: Swagger UI + Postman collection

## Main features
- Browse pets by Dogs, Cats, Birds, Rabbits, Small Animals, Fish and Other Animals.
- Search/filter by type, breed, size, gender, city and vaccination.
- Pet detail pages with image galleries and live availability status.
- JWT registration/login with user/admin roles.
- Adoption applications and admin approval/rejection.
- Real-time availability updates using Socket.io.
- Firebase Admin hooks for push notifications when application status changes.
- Admin dashboard with pet/application management and statistics.
- Match quiz for simple pet recommendations.
- Fully responsive mobile layout while prioritizing desktop.
- Light 3D/hover interactions and image-led sections inspired by modern pet adoption sites, without copying the supplied references.

## Run locally
### 1. MongoDB
Use local MongoDB or MongoDB Atlas and create a database named `petmatch`.

### 2. Backend
```bash
cd backend
cp .env.example .env
# edit .env and set MONGO_URI + JWT_SECRET
npm install
npm run seed
npm run dev
```
Backend: http://localhost:5000
Swagger: http://localhost:5000/api/docs

### 3. Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```
Frontend: http://localhost:5173

## Demo credentials
- Admin: `admin@petmatch.com` / `Admin@123`
- User: `user@petmatch.com` / `User@123`

## Firebase
The project is runnable without Firebase credentials for local demo. To enable Firebase Auth synchronization and FCM push notifications, fill the Firebase Admin values in `backend/.env` and the Firebase Web App values in `frontend/.env`.

## API endpoints
- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/pets`
- GET `/api/pets/:id`
- POST `/api/pets` (admin)
- PUT `/api/pets/:id` (admin)
- DELETE `/api/pets/:id` (admin)
- POST `/api/applications`
- GET `/api/applications`
- GET `/api/applications/:id`
- PUT `/api/applications/:id/status` (admin)
- GET `/api/admin/pets`
- GET `/api/admin/applications`
- GET `/api/admin/dashboard`

## UI reference note
The supplied screenshots were used only as visual direction: image-rich pet adoption layouts, large hero imagery, category browsing and promotional banner sections. The PetMatch UI uses a separate sage/cream/peach design system and different layout/content.

## Uiverse
Uiverse is an open-source UI component library. This project uses the same general idea of restrained 3D/hover interaction, with custom CSS rather than copying a particular component. Uiverse elements are published under MIT according to its current site information.

## Important local setup notes

### Backend
Use `MONGO_URI` in `backend/.env`. The backend also accepts `MONGODB_URI` for convenience.

For local MongoDB:

```env
MONGO_URI=mongodb://127.0.0.1:27017/petmatch
JWT_SECRET=replace-with-a-long-random-secret
CLIENT_URL=http://localhost:5173
```

Then:

```bash
cd backend
npm install
npm run seed
npm start
```

The demo accounts are created by `npm run seed`:

- Admin: `admin@petmatch.com` / `Admin@123`
- User: `user@petmatch.com` / `User@123`

If using MongoDB Atlas, make sure your current IP is allowed in Atlas Network Access and that the database username/password are correct. URL-encode special characters in the database password.

### Frontend
The project uses Vite 6 with `@vitejs/plugin-react` 4, so do not change the plugin to `latest` unless you also upgrade Vite.

```bash
cd frontend
npm install
npm run dev
```

Firebase Web configuration is optional for local JWT mode. Firebase Admin/FCM configuration is optional until push notifications are configured.
