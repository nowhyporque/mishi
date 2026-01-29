import { app, db } from "../firebaseConfig";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getAuth, signOut } from "firebase/auth";

const Navbar = () => {
  const { currentUser } = useAuth();
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User logged out");
        navigate("/login"); // Redirect to the login page
      })
      .catch((error) => {
        console.error("Error during logout:", error.message);
      });
  };

  return (
    <nav>
      <h1>Mishi</h1>
      {currentUser ? (
        <>
          <p>Welcome, {currentUser.displayName || currentUser.email}!</p>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/maps">Maps</Link></li>
            <li><Link to="/community">Community</Link></li>
            <li><Link to="/resources">Resources</Link></li>
            <li><Link to="/fostering">Fostering</Link></li>
            <li><Link to="/account">Account</Link></li>
            <li>
              <button onClick={handleLogout}>Log Out</button>
            </li>
          </ul>
        </>
      ) : (
        <>
          <p>Please log in</p>
          <ul>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </>
      )}
    </nav>
  );
};

export default Navbar;
