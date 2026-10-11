
# 🐾 PetMatch — Pet Adoption Portal

> **Connecting paws to people, one forever home at a time.** 🏡🐶

PetMatch is a full-stack pet adoption platform designed to make the adoption process easier for potential adopters and administrators. Users can explore pets, submit adoption applications, and track the adoption process, while administrators can manage pet listings and review applications.

Built using **React.js, Node.js, Express.js, MongoDB, Firebase, and Socket.io**, this project combines REST APIs, authentication, database management, and real-time communication in one application.

**Live Deployed Link:**
https://pet-adoption-portal-1.onrender.com/

---

## ✨ Features

### 🐶 Pet Management
- Browse available pets.
- View individual pet details.
- Manage pet listings through admin-protected operations.
- Store pet information in MongoDB.

### 📝 Adoption Applications
- Submit adoption applications for selected pets.
- Provide contact details, home information, pet ownership experience, and adoption reasons.
- Retrieve application information.
- Track application statuses.

### 🔐 Authentication & Authorization
- User registration and login.
- JWT-based authentication for protected API routes.
- Role-based access control for administrator operations.
- Password security using hashing in the authentication workflow.

### ⚡ Real-Time Updates
- Socket.io integration for real-time application-related updates.
- Supports real-time communication between the client and server.

### 🔔 Push Notifications
- Firebase Cloud Messaging (FCM) integration.
- Supports browser push notifications using registered FCM tokens.

### 📊 Admin Dashboard
- View dashboard statistics.
- Review pet listings.
- View adoption applications.
- Update application statuses.

### ✅ Input Validation
- Request validation using `express-validator`.
- Authentication and authorization middleware.
- Error handling for invalid or unauthorized requests.

### 💻 Responsive Frontend
- React-based user interface.
- Axios for communicating with the backend API.
- Centralized API configuration.
- Automatic JWT attachment to requests when a token is stored.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend user interface |
| Vite | Frontend development and build tooling |
| Node.js | JavaScript runtime for the backend |
| Express.js | REST API and routing |
| MongoDB | Database |
| Mongoose | MongoDB object modeling |
| Axios | HTTP requests from the frontend |
| JSON Web Token (JWT) | Authentication |
| bcrypt | Password hashing |
| express-validator | Request validation |
| Socket.io | Real-time communication |
| Firebase Cloud Messaging | Push notifications |
| HTML5 & CSS3 | Structure and styling |

---

## 🏗️ Project Architecture

PetMatch follows a frontend-backend architecture.

```text
PetMatch/
│
├── backend/
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── applicationController.js
│   │   ├── authController.js
│   │   └── petController.js
│   │
│   ├── middleware/
│   │   ├── auth.js
│   │   └── validate.js
│   │
│   ├── models/
│   │   ├── Application.js
│   │   ├── Pet.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── applicationRoutes.js
│   │   ├── authRoutes.js
│   │   └── petRoutes.js
│   │
│   ├── scripts/
│   │   └── seed.js
│   │
│   ├── config/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── data/
│   │   └── api.js
│   ├── index.html
│   └── package.json
│
└── README.md
```

*Note: The tree is a representative overview. Adjust it to match the actual folders and files in your repository.*

---

## 🔄 How It Works

1. **User registration:** A new user creates an account.
2. **Login:** The backend verifies the user's credentials and issues a JWT upon successful authentication.
3. **Browse pets:** The frontend requests pet data from the backend API.
4. **Submit an application:** The user selects a pet and submits the required adoption details.
5. **Backend validation:** The API validates incoming data and checks authentication where required.
6. **Application management:** Applications are stored and retrieved through the backend.
7. **Admin review:** Authorized administrators review applications and update their statuses.
8. **Real-time communication:** Socket.io supports real-time application-related updates.
9. **Notifications:** Firebase Cloud Messaging supports push notifications when configured.

---

## 🔐 Authentication Flow

PetMatch uses JWT-based authentication for protected endpoints.

```text
User Login
    ↓
Backend Verifies Credentials
    ↓
JWT Returned to Frontend
    ↓
Frontend Stores Token
    ↓
Axios Request Interceptor Attaches Token
    ↓
Backend Authentication Middleware Verifies Token
    ↓
Authorization Middleware Checks User Role
    ↓
Protected Controller Executes
```

The backend uses authentication middleware to verify the user's identity and authorization middleware to restrict administrator-only operations.

---

## 📸 Screenshots

<img width="1470" height="881" alt="Screenshot 2026-10-03 at 3 41 12 AM" src="https://github.com/user-attachments/assets/96cffb01-ed9f-4c81-95f8-5e3dd865e262" />

<img width="1470" height="879" alt="Screenshot 2026-10-03 at 3 41 28 AM" src="https://github.com/user-attachments/assets/fefa8918-a246-4dde-8d6c-c7295a20dabf" />

<img width="1470" height="884" alt="Screenshot 2026-10-03 at 3 42 06 AM" src="https://github.com/user-attachments/assets/a2bb724b-e20f-4b83-8a12-024e8b3d475f" />

<img width="1470" height="885" alt="Screenshot 2026-10-03 at 3 42 45 AM" src="https://github.com/user-attachments/assets/973bc711-0af6-4b17-9e59-41de72a1323f" />

---

## 🚀 Getting Started

Follow these steps to run PetMatch locally.

### Prerequisites

Install or prepare the following:

- Node.js and npm
- MongoDB or a MongoDB Atlas database
- Git
- A Firebase project if you want to use Firebase Cloud Messaging

### 1. Clone the repository

```bash
git clone https://github.com/juitawde/pet-adoption-portal.git
```

```bash
cd pet-adoption-portal
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure backend environment variables

Create a `.env` file inside the `backend/` directory.

Example configuration:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_jwt_secret
CLIENT_URL=http://localhost:5173
```

Configure any additional Firebase or notification variables required by your actual backend implementation.

**Important:** Use the exact environment variable names expected by your code. Never commit database credentials, JWT secrets, Firebase private keys, or other secrets to GitHub.

### 4. Start the backend

```bash
npm start
```

If your `package.json` uses a different script, run the appropriate command, such as:

```bash
npm run dev
```

Keep the backend terminal running.

### 5. Install frontend dependencies

Open a second terminal:

```bash
cd pet-adoption-portal/frontend
npm install
```

### 6. Configure frontend environment variables

Create a `.env` file inside the `frontend/` directory.

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

These values match the fallback URLs in the frontend API configuration. Change them if your backend runs on a different address or port.

### 7. Start the frontend

```bash
npm run dev
```

Open the local URL displayed by Vite in your terminal, commonly:

```text
http://localhost:5173
```

---

## 🌱 Database Seeding

PetMatch includes a seed script for populating the database with sample pet data.

From the backend directory, run the command appropriate for your project:

```bash
node scripts/seed.js
```

Run this only after configuring the database connection.

**Note:** Check the implementation of `seed.js` before running it against an existing database. Depending on its logic, it may insert duplicate records or modify existing data.

---

## 🌐 Environment Variables

### Backend

| Variable | Description |
|---|---|
| `PORT` | Port on which the backend server listens |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign and verify JWTs |
| `CLIENT_URL` | Frontend origin allowed by the backend, if used in CORS configuration |

Firebase-related environment variables may also be required, depending on your implementation.

### Frontend

| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL for HTTP API requests |
| `VITE_SOCKET_URL` | Base URL for Socket.io connections |

Frontend variables prefixed with `VITE_` are exposed to the browser bundle. Do not put private credentials or server secrets in frontend environment variables.

---

## 📡 API Overview

The following table describes the routes discussed in the project. The final endpoint paths depend on how the routers are mounted in `server.js`.

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/login` | Log in |
| POST | `/api/auth/fcm-token` | Save an authenticated user's FCM token |
| GET | `/api/pets` | Retrieve pet listings |
| GET | `/api/pets/:id` | Retrieve a pet by ID |
| POST | `/api/pets` | Create a pet listing (admin only) |
| PUT | `/api/pets/:id` | Update a pet listing (admin only) |
| DELETE | `/api/pets/:id` | Delete a pet listing (admin only) |
| POST | `/api/applications` | Submit an adoption application |
| GET | `/api/applications` | Retrieve applications for an authenticated user |
| GET | `/api/applications/:id` | Retrieve a particular application |
| PUT | `/api/applications/:id/status` | Update application status (admin only) |

Some route names and response behaviors may vary with your implementation. Confirm the router mount paths and controller-level access checks before treating this table as a complete API specification.

### Application Statuses

The application status validation accepts these values:

- `pending`
- `under_review`
- `approved`
- `rejected`

---

## 🔔 Firebase Cloud Messaging

PetMatch integrates Firebase Cloud Messaging to support browser push notifications.

To enable notifications:

1. Configure a Firebase project.
2. Set up the Firebase client configuration.
3. Configure the Firebase Admin SDK on the backend if required by your implementation.
4. Configure the browser notification permission and service worker.
5. Register the user's FCM token with the backend.
6. Test notifications in a supported browser and deployment environment.

Notification delivery depends on correct Firebase configuration, browser permissions, service-worker setup, and valid FCM tokens.

---

## 🧠 Key Learning Outcomes

Building PetMatch provided practical experience with:

- Designing RESTful APIs using Express.js.
- Organizing backend code into routes, controllers, models, and middleware.
- Working with MongoDB and Mongoose.
- Implementing JWT authentication and role-based authorization.
- Validating API requests.
- Connecting a React frontend to a backend using Axios.
- Managing environment variables.
- Integrating Socket.io for real-time communication.
- Exploring Firebase Cloud Messaging.
- Debugging and connecting multiple technologies in a full-stack application.

---

## 🔮 Future Improvements

Potential enhancements include:

- Advanced pet search and filtering.
- Pet image uploads and cloud storage.
- Email notifications for application status changes.
- Adoption application history and progress tracking.
- Improved admin analytics.
- Automated backend tests.
- API documentation with Swagger.
- Additional security measures, rate limiting, and production monitoring.

---

## 🤝 Contributing

Contributions, suggestions, and feedback are welcome!

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a pull request describing your improvements.

---

## 👩‍💻 Author

**Jui Tawde**

Computer Science Engineering Student | Aspiring Full-Stack Developer

- GitHub: [@juitawde](https://github.com/juitawde)
- Project Repository: [PetMatch — Pet Adoption Portal](https://github.com/juitawde/pet-adoption-portal)

---

## ❤️ Final Note

PetMatch is built around a simple idea: every pet deserves a loving home.

This project is also part of my journey toward becoming a better developer — one feature, one bug fix, and one `console.log()` at a time. 😂🐾

**Built with code, curiosity, and a whole lot of love for pets.**
