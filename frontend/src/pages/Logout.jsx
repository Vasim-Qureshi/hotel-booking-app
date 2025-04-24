import React from "react";
import {useNavigate} from "react-router-dom";

// const token = localStorage.getItem('token');
// console.log(token); // for checking the token value
function Logout() {
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove token from local storage
        navigate('/login'); // Redirect to login page using navigate
        window.location.reload(false);
    };
    return ( 

        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Logout Successful</h1>
            <h1>You have been logged out</h1>
            <button className="text-amber-300 bg-amber-700 w-full" onClick={handleLogout}>Login Again</button>
            <div>
                <img src="https://cdn-icons-png.flaticon.com/512/1828/1828770.png" alt="Logout Icon" className="w-24 h-24 mb-4" />
            </div>
        </div>
     );
}

export default Logout;