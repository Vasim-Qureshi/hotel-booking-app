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