import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const HotelDetail = () => {
    const { id } = useParams();
    console.log(id); // for checking the hotelId value
    
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchHotelDetails = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/hotels/${id}`, {  // Fixed template literal
            headers: { Authorization: `Bearer ${token}` },
            });
            setHotel(data);
        } catch (error) {
            console.error("Error fetching hotel details:", error);
            toast.error("Failed to fetch hotel details");
        } finally {
            setLoading(false);
        }
        };
    
        fetchHotelDetails();
    }, []);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/hotels/${id}`, {  // Updated URL
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Hotel deleted successfully");
            navigate("/admin/hotels");
        } catch (error) {
            console.error("Error deleting hotel:", error);
            toast.error("Failed to delete hotel");
        }
    };
    const handleEdit = () => {
        navigate(`/admin/hotels/edit/${id}`);
        toast.error("Failed to update hotel");

    };
    const handleBooking = () => {
        navigate(`/hotel/booking/${id}`);
        toast.success("Booking initiated");

    };
    if (loading) {
        return <div>Loading...</div>;
    }
    if (!hotel) {
        return <div>Hotel not found</div>;
    }
    return (
        <div className="container mx-auto p-4 text-center">
            <h1 className="text-3xl font-bold mb-6">{hotel.name}</h1>
            <p className="text-gray-600">{hotel.location}</p>
            <p className="text-blue-600 font-bold">${hotel.price}/night</p>
            <img src="https://momblogsociety.com/wp-content/uploads/2019/03/hotels.jpg" alt={hotel.name} className="w-full h-130 object-cover mt-4" />
            <p className="mt-4">{hotel.description}</p>
            <div className="mt-6">
                {/* <button onClick={handleEdit} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Edit</button> */}
                {/* <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded mr-2">Delete</button> */}
                <button onClick={handleBooking} className="bg-green-500 text-white px-4 py-2 rounded">Book Now</button>
            </div>
        </div>
    );
}
export default HotelDetail;
