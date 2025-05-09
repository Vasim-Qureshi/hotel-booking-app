import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const BookingManager = () => {
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({
    user: '',
    hotel: '',
    checkIn: '',
    checkOut: '',
    status: 'pending',
  });

  const [users, setUsers] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem('token');

  const fetchData = async () => {
    try {
      const [bookingRes, userRes, hotelRes] = await Promise.all([
        axios.get("http://localhost:5000/api/bookings", { // Fixed the URL
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:5000/api/users", { // Fixed the URL
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:5000/api/hotels", { // Fixed the URL
          headers: { Authorization: `Bearer ${token}` },
        })
      ]);
      setBookings(bookingRes.data);
      setUsers(userRes.data);
      setHotels(hotelRes.data);
      toast.success('Data fetched successfully!');
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data. Please try again later.');
      return
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/bookings/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post("http://localhost:5000/api/bookings", form, { // Fixed the URL
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setForm({ user: '', hotel: '', checkIn: '', checkOut: '', status: 'pending' });
      setEditingId(null);
      fetchData();
      toast.success(editingId ? 'Booking updated successfully!' : 'Booking added successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error submitting form. Please try again.');
      return;
    }
  };

  const handleEdit = (b) => {
    setForm({
      user: b.user._id,
      hotel: b.hotel._id,
      checkIn: b.checkIn.slice(0, 10),
      checkOut: b.checkOut.slice(0, 10),
      status: b.status,
    });
    setEditingId(b._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/bookings/${id}`, { // Fixed the URL
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchData();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Booking Manager</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        <select name="user" value={form.user} onChange={handleChange} className="p-2 border rounded">
          <option value="">Select User</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>{u.name}</option>
          ))}
        </select>

        <select name="hotel" value={form.hotel} onChange={handleChange} className="p-2 border rounded">
          <option value="">Select Hotel</option>
          {hotels.map((h) => (
            <option key={h._id} value={h._id}>{h.name}</option>
          ))}
        </select>

        <input type="date" name="checkIn" value={form.checkIn} onChange={handleChange} className="p-2 border rounded" />
        <input type="date" name="checkOut" value={form.checkOut} onChange={handleChange} className="p-2 border rounded" />

        <select name="status" value={form.status} onChange={handleChange} className="p-2 border rounded">
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 col-span-full">
          {editingId ? 'Update Booking' : 'Add Booking'}
        </button>
      </div>
      <ToastContainer className="toast-container items-center" /> {/* Add ToastContainer for notifications */}
      <h3 className="text-xl font-bold text-blue-600 mb-4">Bookings List</h3>
      <div className="space-y-2">
        {bookings.map((b) => (
          <div key={b._id} className="bg-white rounded shadow p-4 flex justify-between items-center">
            <div>
              <p className="font-semibold">{b.user.name !== null ? b.user.name : 'Unknown User'} - {b.hotel.name}</p>
              <p className="text-sm text-gray-500">{b.checkIn.slice(0, 10)} to {b.checkOut.slice(0, 10)} | {b.status}</p>
            </div>
            <div className="space-x-2">
              <button onClick={() => handleEdit(b)} className="px-3 py-1 bg-yellow-400 text-white rounded">Edit</button>
              <button onClick={() => handleDelete(b._id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingManager;
