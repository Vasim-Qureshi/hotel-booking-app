# Step 1: Create Frontend with Vite
mkdir hotel-booking-app
cd hotel-booking-app
npm create vite@latest frontend --template react

# Step 2: Install Dependencies for Frontend
cd frontend
npm install react-router-dom axios tailwindcss @headlessui/react
npx tailwindcss init -p

# Step 3: Create Backend with Express.js
cd ..
mkdir backend
cd backend
npm init -y
npm install express mongoose dotenv cors bcryptjs jsonwebtoken morgan nodemon

# Step 4: Create Necessary Files & Folders
mkdir models routes controllers config middleware

# Step 5: Setup MongoDB Connection
cat > config/db.js <<EOL
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
module.exports = connectDB;
EOL

# Step 6: Setup Express Server
cat > index.js <<EOL
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Connect Database
connectDB();

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/hotels', require('./routes/hotelRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
EOL

# Step 7: Setup Environment Variables
cat > .env <<EOL
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret_key
EOL

# Step 8: Setup Scripts for Backend
sed -i '' 's/"test": "echo \"Error: no test specified\" && exit 1"/"start": "node index.js",\n    "dev": "nodemon index.js"/' package.json

# Step 9: Create Mongoose Models

# User Model
cat > models/User.js <<EOL
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, { timestamps: true });
module.exports = mongoose.model('User', UserSchema);
EOL

# Hotel Model
cat > models/Hotel.js <<EOL
const mongoose = require('mongoose');
const HotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  amenities: { type: [String], required: true },
  rooms: { type: Number, required: true }
}, { timestamps: true });
module.exports = mongoose.model('Hotel', HotelSchema);
EOL

# Booking Model
cat > models/Booking.js <<EOL
const mongoose = require('mongoose');
const BookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' }
}, { timestamps: true });
module.exports = mongoose.model('Booking', BookingSchema);
EOL

# Step 10: Create Express Routes
mkdir routes/admin

# User Routes
cat > routes/userRoutes.js <<EOL
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

router.post('/', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

router.put('/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(user);
});

router.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

module.exports = router;
EOL

# Authentication Routes
cat > routes/authRoutes.js <<EOL
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });
  res.status(201).json(user);
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

module.exports = router;
EOL

# Hotel Routes
cat > routes/hotelRoutes.js <<EOL
const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel');

router.get('/', async (req, res) => {
  const hotels = await Hotel.find();
  res.json(hotels);
});

router.get('/:id', async (req, res) => {
  const hotel = await Hotel.findById(req.params.id);
  res.json(hotel);
});

router.post('/', async (req, res) => {
  const hotel = await Hotel.create(req.body);
  res.status(201).json(hotel);
});

router.put('/:id', async (req, res) => {
  const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(hotel);
});

router.delete('/:id', async (req, res) => {
  await Hotel.findByIdAndDelete(req.params.id);
  res.json({ message: 'Hotel deleted' });
});

module.exports = router;
EOL

# Booking Routes
cat > routes/bookingRoutes.js <<EOL
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

router.get('/', async (req, res) => {
  const bookings = await Booking.find().populate('user hotel');
  res.json(bookings);
});

router.get('/:id', async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate('user hotel');
  res.json(booking);
});

router.post('/', async (req, res) => {
  const booking = await Booking.create(req.body);
  res.status(201).json(booking);
});

router.put('/:id', async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(booking);
});

router.delete('/:id', async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.json({ message: 'Booking deleted' });
});

module.exports = router;
EOL

# Step 11: Setup React Pages & Components
cd ../frontend
mkdir -p src/pages/admin

# Admin Dashboard with CRUD
cat > src/pages/admin/AdminDashboard.jsx <<EOL
import React from 'react';
const AdminDashboard = () => {
  return (
    <div className='p-4 text-xl'>
      <h1>Admin Dashboard</h1>
      <div>
        <a href='/admin/hotels'>Manage Hotels</a> |
        <a href='/admin/users'>Manage Users</a> |
        <a href='/admin/bookings'>Manage Bookings</a>
      </div>
    </div>
  );
};
export default AdminDashboard;
EOL

# Update App Router
cat > src/App.jsx <<EOL
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/admin' element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}
export default App;
EOL
