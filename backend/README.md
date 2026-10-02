# PetMatch Backend

Node.js + Express + MongoDB/Mongoose + JWT + Firebase Admin + Socket.io.

## Run
1. `cp .env.example .env`
2. Set `MONGO_URI` and `JWT_SECRET`.
3. `npm install`
4. `npm run seed`
5. `npm run dev`

API: `http://localhost:5000`
Swagger UI: `http://localhost:5000/api/docs`

Firebase Admin is optional for local development. Add Firebase service-account values to `.env` to enable FCM push notifications and Firebase Auth user synchronization.
