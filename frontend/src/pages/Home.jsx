import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import React from 'react';

const Home = () => {
  const [hotels, setHotels] = useState([]);


  const token = localStorage.getItem('token');
  // console.log(token); // for checking the token value
  

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/hotels", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setHotels(data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };
    fetchHotels();
  }, [token]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl bg-amber-600 font-bold mb-6">Available Hotels</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {hotels.map((hotel) => (
          <div key={hotel._id} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{hotel.name}</h2>
            <p className="text-gray-600">{hotel.location}</p>
            <p className="text-blue-600 font-bold">${hotel.price}/night</p>
            <Link to={`/hotel/${hotel._id}`} className="text-blue-500 hover:underline mt-2 block">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
