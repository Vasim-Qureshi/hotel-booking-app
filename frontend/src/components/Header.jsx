import React from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode
// import Logout from '../pages/Logout';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { useEffect } from 'react';


function Header() {
  const navigate = useNavigate(); // Initialize useNavigate
  const token = localStorage.getItem('token'); // Retrieve token from local storage
  // console.log(token); // for checking the token value

  // Decode token to get user ID
  const decodedToken = token ? jwtDecode(token) : null;
  // console.log(decodedToken); // for checking the decoded token value

  const userRole = decodedToken ? decodedToken.role : null;
  console.log(userRole); // for checking the userId value

  const isAdmin = userRole === "admin" ? true : false;
  const isLogin = token ? true : false;

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    navigate('/login'); // Redirect to login page using navigate
    // window.location.reload(false);
  };

  const handleLogin = () => {
    localStorage.getItem('token'); // Retrieve token from local storage
  }


  const renderAdminLink = () => {
    if (isAdmin) {
      return (
        <>
          <li>
            <Link to="/admin" className="text-blue-500 hover:underline">Admin</Link>
          </li>
          <li>
            <Link to="/admin/bookings" className="text-blue-500 hover:underline">Bookings</Link>
          </li>
          <li>
            <Link to="/admin/hotels" className="text-blue-500 hover:underline">Hotels</Link>
          </li>
          <li>
            <Link to="/admin/users" className="text-blue-500 hover:underline">Users</Link>
          </li>
          <li>
            <Link to="/admin/settings" className="text-blue-500 hover:underline">Settings</Link> {/* New Settings link */}
          </li>
        </>

      );
    }
    return null;
  };

  return (
    <div>
      <nav>
        <ul className="flex space-x-4 mb-6">
          <li>
            <Link to="/" className="text-blue-500 hover:underline">Home</Link>
          </li>
          {renderAdminLink()} {/* admin link show if user is admin */}
          <li>
            <Link to={isLogin ? "/logout" : "/login"} onClick={isLogin ? handleLogout : handleLogin} className="text-blue-500 hover:underline">{isLogin ? "Logout" : "Login"}</Link>
          </li>
          <li>
            <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;