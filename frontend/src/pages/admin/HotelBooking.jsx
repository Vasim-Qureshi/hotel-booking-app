import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS


const HotelBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [form, setForm] = useState({
        user: '',
        hotel: '',
        checkIn: '',
        checkOut: '',
        status: 'pending',
    });

    const [user, setUser] = useState(null);
    const [hotel, setHotel] = useState(null);
    const [editingId, setEditingId] = useState(null);

    const token = localStorage.getItem('token');
    // console.log(token); // for checking the token value

    const { hotelId } = useParams(); // Get hotel ID from URL
    console.log(hotelId); // for checking the hotelId value

    // Decode token to get user ID
    const decodedToken = token ? jwtDecode(token) : null;
    // console.log(decodedToken); // for checking the decoded token value

    const userId = decodedToken ? decodedToken.userId : null;
    console.log(userId); // for checking the userId value

    const fetchUserAndHotel = async () => {
        try {

            const userRes = await axios.get(`https://hotel-booking-app-sand-seven.vercel.app/api/users/${userId}`, { // Fixed template literal syntax
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(userRes.data);
            console.log(userRes.data);


            const hotelRes = await axios.get(`https://hotel-booking-app-sand-seven.vercel.app/api/hotels/${hotelId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setHotel(hotelRes.data);
            console.log(hotelRes.data); // for checking the hotel value

        } catch (error) {
            console.error('Error fetching user or hotel:', error);
        }
    };
    // console.log(user); // for checking the user value
    // console.log(hotel); // for checking the hotel value

    const fetchBookings = async () => {
        try {
            const bookingRes = await axios.get("https://hotel-booking-app-sand-seven.vercel.app/api/bookings", { // Fixed template literal syntax
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(bookingRes.data); // for checking the bookings value
            setBookings(bookingRes.data);
            const filteredBookings = bookingRes.data.filter(booking => booking.user._id === userId); // Filter bookings by userId
            setBookings(filteredBookings); // Set filtered bookings to state
            console.log(filteredBookings); // for checking the bookings value
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    useEffect(() => {
        fetchUserAndHotel();
        fetchBookings();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (editingId) {
            try {
                // Update existing booking
                await axios.put(`https://hotel-booking-app-sand-seven.vercel.app/api/bookings/${editingId}`, form, { // Fixed the URL
                    headers: { Authorization: `Bearer ${token}` },
                });
                toast.success('Booking updated successfully!');
            } catch (error) {
                // Handle error (e.g., show a notification)
                console.error('Error updating booking:', error);
                return toast.error('Error updating booking!');
            }
        } else {
            try {
                // Create a new booking
                let { checkIn, checkOut, status } = form;
                await axios.post("https://hotel-booking-app-sand-seven.vercel.app/api/bookings", { user: userId, hotel: hotelId, checkIn, checkOut, status }, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                toast.success('Booking created successfully!');
            } catch (error) {
                // Handle error (e.g., show a notification)
                console.error('Error creating booking:', error);
                return toast.error('Error creating booking!');
            } finally {
                // Reset form after submission
                setForm({ user: '', hotel: '', checkIn: '', checkOut: '', status: 'pending' });
                setEditingId(null);
                fetchBookings();
            }
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
        await axios.delete(`https://hotel-booking-app-sand-seven.vercel.app/api/bookings/${id}`, { // Fixed the URL
            headers: { Authorization: `Bearer ${token}` },
        });
        fetchBookings();
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Booking Manager</h2>
            {user && hotel ? (
                <div>
                    <p className="mb-4">Logged in as: {user.name}</p>
                    <p className="mb-4">Managing bookings for hotel: {hotel.name}</p>
                </div>
            ) : (
                <p>Loading user and hotel information...</p>
            )}
            <ToastContainer className="toast-container items-center" /> {/* Add ToastContainer for notifications */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                <input
                    type="date"
                    name="checkIn"
                    value={form.checkIn}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <input
                    type="date"
                    name="checkOut"
                    value={form.checkOut}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="p-2 border rounded"
                >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 col-span-full"
                >
                    {editingId ? 'Update Booking' : 'Add Booking'}
                </button>
            </div>

            <div className="space-y-2">
                {bookings.map((b) => (
                    userId ? (
                        <>
                            <div
                                key={b._id}
                                className="bg-white rounded shadow p-4 flex justify-between items-center"
                            >
                                {b.user && b.hotel ? (
                                    <div>
                                        <p className="font-semibold">
                                            {b.user.name} - {b.hotel.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {b.checkIn.slice(0, 10)} to {b.checkOut.slice(0, 10)} | {b.status}
                                        </p>
                                    </div>
                                ) : (
                                    <p className="text-red-500">user or hotel not available</p>
                                )}
                                <div className="space-x-2">
                                    <button
                                        onClick={() => handleEdit(b)}
                                        className="px-3 py-1 bg-yellow-400 text-white rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(b._id)}
                                        className="px-3 py-1 bg-red-500 text-white rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </>
                    )
                        : <h1 className="text-red-500">No bookings found</h1>
                ))}
            </div>
        </div>
    );
};

export default HotelBooking;