import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Link to="/admin/users" className="bg-white p-6 rounded shadow hover:bg-blue-50 text-center border border-blue-300">
          Manage Users
        </Link>
        <Link to="/admin/hotels" className="bg-white p-6 rounded shadow hover:bg-blue-50 text-center border border-blue-300">
          Manage Hotels
        </Link>
        <Link to="/admin/bookings" className="bg-white p-6 rounded shadow hover:bg-blue-50 text-center border border-blue-300">
          Manage Bookings
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
