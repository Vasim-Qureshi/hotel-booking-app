import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React from 'react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', { name, email, password, role });
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-3 border rounded" required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 border rounded" required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 border rounded" required />
        <input type="role" placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 mb-3 border rounded" required />
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
};

export default Register;
