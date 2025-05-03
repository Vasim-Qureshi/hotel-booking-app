import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js'; // ✅ Ensure .js extension
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import loginRoutes from './routes/loginRoutes.js';
import hotelRoutes from "./routes/hotelRoutes.js";
import bookingRoutes from './routes/bookingRoutes.js';
import { verifyToken } from './middleware/auth.js';

// Load Environment Variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: 'https://hotel-booking-app-6wo1.vercel.app', credentials: true })); // Fixed quotes around URL

// Connect Database
connectDB();

// Routes
app.use('/api/auth/register',authRoutes);
app.use('/api/auth/login', loginRoutes);
app.use('/api/hotels',verifyToken, hotelRoutes);
app.use('/api/bookings',verifyToken, bookingRoutes);
app.use('/api/users', userRoutes);
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5100;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
