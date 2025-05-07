import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const token = localStorage.getItem('token');
// console.log(token); // for checking the token value

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://hotel-booking-app-sand-seven.vercel.app/api/users", { // Fixed URL
         headers: { Authorization: `Bearer ${token}` } });
      setUsers(res.data);
      toast.success('Users fetched successfully!');
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users. Please try again later.');
      return;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await axios.put(`https://hotel-booking-app-sand-seven.vercel.app/api/users/${editingId}`, form, { // Fixed URL
          headers: { Authorization: `Bearer ${token}` },
        }); // Updated URL
      } else {
        await axios.post("https://hotel-booking-app-sand-seven.vercel.app/api/users", form, { // Fixed URL
          headers: { Authorization: `Bearer ${token}` },
        }); // Fixed URL
      }
      setForm({ name: '', email: '', password: '', role: '' }); // Reset form after submission
      setEditingId(null);
      fetchUsers();
      toast.success(editingId ? 'User updated successfully!' : 'User added successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit form. Please try again later.');
      return;
    }
  };

  const handleEdit = (user) => {
    try {
      setForm({ name: user.name, email: user.email });
      setEditingId(user._id);
      toast.info('Editing user. Please make changes and submit.');
    } catch (error) {
      console.error('Error editing user:', error);
      toast.error('Failed to edit user. Please try again later.');
      return;

    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://hotel-booking-app-sand-seven.vercel.app/api/users/${id}`, { // Fixed URL
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('User deleted successfully!');
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user. Please try again later.');
      return;
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">User Manager</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="p-2 border rounded" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="p-2 border rounded" />
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" className="p-2 border rounded" />        
        <select name="role" value={form.role} onChange={handleChange} className="p-2 border rounded">
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>

        <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 col-span-full">
          {editingId ? 'Update User' : 'Add User'}
        </button>
      </div>
      <ToastContainer className="toast-container items-center" /> {/* Add ToastContainer for notifications */}
        <div className="flex justify-end">
          <button onClick={fetchUsers} className="bg-green-500 text-white px-4 py-2 m-2 rounded hover:bg-green-600">Refresh</button>
        </div>
        <h3 className="text-4xl mb-2 text-amber-600 font-semibold">User List</h3>
        <div className="space-y-2">
          {users.map(user => (
            <div key={user._id} className="p-4 bg-white rounded shadow flex justify-between items-center">
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-sm text-gray-500">{user.role}</p>
              </div>
              <div className="space-x-2">
                <button onClick={() => handleEdit(user)} className="px-3 py-1 bg-yellow-400 text-white rounded">Edit</button>
                <button onClick={() => handleDelete(user._id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
};
      export default UserManager;
