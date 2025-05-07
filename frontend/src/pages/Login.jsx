import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React from 'react';
import api from '../api'; // Import the api instance

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("https://hotel-booking-app-sand-seven.vercel.app/api/auth/login", { email, password }); // Fixed array brackets
      localStorage.setItem('token', data.token);
      navigate('/'); // Redirect to home after login
    } catch (error) {
      alert('Invalid credentials from login.js');
    } finally {
      window.location.reload(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <input type="email" placeholder="Email" value={email} autoComplete='username' onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 border rounded" required />
        <input type="password" placeholder="Password" value={password} autoComplete='current-password' onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 border rounded" required />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;
