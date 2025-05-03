import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS

const HotelManage = () => {
  const [hotels, setHotels] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    price: '',
    amenities: '',
    rooms: '',
  });
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem('token');

  const fetchHotels = async () => {
    const res = await axios.get("https://hotel-booking-app-sand-seven.vercel.app/api/hotels", {  // Fixed URL
      headers: { Authorization: `Bearer ${token}` },
    });
    setHotels(res.data);
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = {
        ...formData,
        amenities: formData.amenities.split(',').map((item) => item.trim()),
        price: parseFloat(formData.price),
        rooms: parseInt(formData.rooms),
      };

      if (editingId) {
        await axios.put(`https://hotel-booking-app-sand-seven.vercel.app/api/hotels/${editingId}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Hotel updated successfully!');
        setEditingId(null);
      } else {
        await axios.post("https://hotel-booking-app-sand-seven.vercel.app/api/hotels", data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Hotel added successfully!');
      }
      setFormData({ name: '', location: '', price: '', amenities: '', rooms: '' });
      fetchHotels();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error submitting form. Please try again.');
    }
  };

  const handleEdit = (hotel) => {
    setFormData({
      name: hotel.name,
      location: hotel.location,
      price: hotel.price,
      amenities: hotel.amenities.join(', '),
      rooms: hotel.rooms,
    });
    setEditingId(hotel._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://hotel-booking-app-sand-seven.vercel.app/api/hotels/${id}`, {  // Updated URL
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Hotel deleted successfully");
      fetchHotels();
    } catch (error) {
      console.error("Error deleting hotel:", error);
      toast.error("Failed to delete hotel");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Hotel Management</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8 grid gap-4 md:grid-cols-2">
        <input
          type="text"
          name="name"
          placeholder="Hotel Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          name="rooms"
          placeholder="Number of Rooms"
          value={formData.rooms}
          onChange={handleChange}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="amenities"
          placeholder="Amenities (comma separated)"
          value={formData.amenities}
          onChange={handleChange}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition md:col-span-2"
        >
          {editingId ? 'Update Hotel' : 'Add Hotel'}
        </button>
      </form>
      <ToastContainer className="toast-container items-center" /> {/* Add ToastContainer for notifications */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Hotel List</h2>
        {hotels.length === 0 ? (
          <p className="text-gray-500">No hotels available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border">
              <thead className="bg-blue-100">
                <tr>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Location</th>
                  <th className="p-2 border">Price</th>
                  <th className="p-2 border">Rooms</th>
                  <th className="p-2 border">Amenities</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {hotels.map((hotel) => (
                  <tr key={hotel._id} className="hover:bg-gray-50">
                    <td className="border p-2">{hotel.name}</td>
                    <td className="border p-2">{hotel.location}</td>
                    <td className="border p-2">₹{hotel.price}</td>
                    <td className="border p-2">{hotel.rooms}</td>
                    <td className="border p-2">{hotel.amenities.join(', ')}</td>
                    <td className="border p-2 flex flex-wrap gap-2">
                      <button
                        onClick={() => handleEdit(hotel)}
                        className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(hotel._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelManage;
