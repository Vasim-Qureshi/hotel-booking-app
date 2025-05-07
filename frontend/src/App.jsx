import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'
import Home from './pages/Home';
import React from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManager from './pages/admin/UserManager';
import BookingManager from './pages/admin/BookingManager';
import HotelManager from './pages/admin/HotelManager';
import PageNotFound from "./pages/NotFound"
import Header from './components/Header';
import HotelDetail from './pages/admin/HotelDetail';
import HotelBooking from './pages/admin/HotelBooking';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode
import Logout from './pages/Logout';

const token = localStorage.getItem('token');
// console.log(token); // for checking the token value
// Decode token to get user ID
const decodedToken = token ? jwtDecode(token) : null;
// console.log(decodedToken); // for checking the decoded token value

const userRole = decodedToken ? decodedToken.role : null;
console.log(userRole); // for checking the userId value


function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/logout' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/admin' element={<AdminDashboard />} />
                <Route path='/admin/users' element={<UserManager />} />
                <Route path='/admin/hotels' element={<HotelManager />} />
                <Route path='/admin/bookings' element={<BookingManager />} />
                <Route path='/hotel/:id' element={<HotelDetail />} />
                <Route path='/hotel/booking/:hotelId' element={<HotelBooking />} />
                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
