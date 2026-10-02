require('dotenv').config(); 
// This loads the .env file into your Node.js application.

const http = require('http');
const express = require('express');

const cors = require('cors');
const morgan = require('morgan');

const { Server } = require('socket.io');
const swaggerUi = require('swagger-ui-express');

const connectDB = require('./config/db');

const { initFirebase } = require('./config/firebase');
const swaggerDocument = require('./docs/swagger');

const authRoutes = require('./routes/authRoutes');
const petRoutes = require('./routes/petRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const server = http.createServer(app);

const io = new Server(server, { cors: { origin: process.env.CLIENT_URL || 'http://localhost:5173', methods: ['GET', 'POST', 'PUT', 'DELETE'] } });
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));

app.use(express.json());
app.use(morgan('dev'));

app.use((req, _res, next) => {
    req.io = io;
    next();
});

app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'PetMatch API' }));

app.use('/api/auth', authRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

io.on('connection', socket => {
    console.log('Socket connected:', socket.id);
    socket.on('joinPetRoom', petId => socket.join(`pet:${petId}`));
    socket.on('disconnect', () => console.log('Socket disconnected:', socket.id));
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    initFirebase();
    server.listen(PORT, () => console.log(`PetMatch API running on http://localhost:${PORT}`));
}).catch(error => {
    console.error('Startup failed:', error.message);
    process.exit(1);
});
