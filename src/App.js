// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import Home from './Home';
// import Maps from './Maps';
// import Community from './Community';
// import Resources from './Resources';
// import Fostering from './Fostering';

// const App = () => {
//   return (
//     <Router>
//       <div>
//         {/* Navigation Bar */}
//         <nav>
//           <ul>
//             <li><Link to="/">Home</Link></li>
//             <li><Link to="/maps">Maps</Link></li>
//             <li><Link to="/community">Community</Link></li>
//             <li><Link to="/resources">Resources</Link></li>
//             <li><Link to="/fostering">Fostering</Link></li>
//           </ul>
//         </nav>

//         {/* Routes */}
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/maps" element={<Maps />} />
//           <Route path="/community" element={<Community />} />
//           <Route path="/resources" element={<Resources />} />
//           <Route path="/fostering" element={<Fostering />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };







// export default App;
// import React from "react";
// import FirebaseTest from "./FirebaseTest";

// const App = () => {
//   return (
//     <div>
//       <FirebaseTest />
//     </div>
//   );
// };

// export default App;



// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import Home from "./components/Home";
// import Maps from "./components/Maps";
// import Community from "./components/Community";
// import Resources from "./components/Resources";
// import Fostering from "./components/Fostering";
// import SignUp from "./components/SignUp";
// import Login from "./components/Login";
// import PrivateRoute from "./components/PrivateRoute";

// const App = () => {
//   return (
//     <Router>
//       <div>
//         {/* Navigation Bar */}
//         <nav>
//           <ul>
//             <li><Link to="/">Home</Link></li>
//             <li><Link to="/maps">Maps</Link></li>
//             <li><Link to="/community">Community</Link></li>
//             <li><Link to="/resources">Resources</Link></li>
//             <li><Link to="/fostering">Fostering</Link></li>
//             <li><Link to="/signup">Sign Up</Link></li>
//             <li><Link to="/login">Login</Link></li>
//           </ul>
//         </nav>

//         {/* Routes */}
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/maps" element={<PrivateRoute element={<Maps />} />} />
//           <Route path="/community" element={<PrivateRoute element={<Community />} />} />
//           <Route path="/resources" element={<PrivateRoute element={<Resources />} />} />
//           <Route path="/fostering" element={<PrivateRoute element={<Fostering />} />} />
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/login" element={<Login />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;









// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import Home from "./components/Home";
// import Maps from "./components/Maps";
// import Community from "./components/Community";
// import Resources from "./components/Resources";
// import Fostering from "./components/Fostering";
// import SignUp from "./components/SignUp";
// import Login from "./components/Login";
// import PrivateRoute from "./components/PrivateRoute";
// import Navbar from "./components/Navbar"; // Import the Navbar

// const App = () => {
//   return (
//     <Router>
//       <div>
//         <Navbar /> {/* Add the Navbar at the top */}
//         <nav>
//           <ul>
//             <li><Link to="/">Home</Link></li>
//             <li><Link to="/maps">Maps</Link></li>
//             <li><Link to="/community">Community</Link></li>
//             <li><Link to="/resources">Resources</Link></li>
//             <li><Link to="/fostering">Fostering</Link></li>
//             <li><Link to="/signup">Sign Up</Link></li>
//             <li><Link to="/login">Login</Link></li>
//           </ul>
//         </nav>

//         {/* Routes */}
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/maps" element={<PrivateRoute element={<Maps />} />} />
//           <Route path="/community" element={<PrivateRoute element={<Community />} />} />
//           <Route path="/resources" element={<PrivateRoute element={<Resources />} />} />
//           <Route path="/fostering" element={<PrivateRoute element={<Fostering />} />} />
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/login" element={<Login />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;







// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import Home from "./components/Home";
// import Maps from "./components/Maps";
// import Community from "./components/Community";
// import Resources from "./components/Resources";
// import Fostering from "./components/Fostering";
// import Account from "./components/Account";
// import SignUp from "./components/SignUp";
// import Login from "./components/Login";
// import PrivateRoute from "./components/PrivateRoute";
// import Navbar from "./components/Navbar"; // Import the Navbar




// const App = () => {
//   return (
//     <Router>
//       <div>
//         <nav>
//           <ul>
//             <li><Link to="/">Home</Link></li>
//             <li><Link to="/maps">Maps</Link></li>
//             <li><Link to="/community">Community</Link></li>
//             <li><Link to="/resources">Resources</Link></li>
//             <li><Link to="/fostering">Fostering</Link></li>
//             <li><Link to="/account">Account</Link></li>
//           </ul>
//         </nav>
//         <Routes>
//           <Route path="/" element={<PrivateRoute element={<Home />} />} />
//           <Route path="/maps" element={<PrivateRoute element={<Maps />} />} />
//           <Route path="/community" element={<PrivateRoute element={<Community />} />} />
//           <Route path="/resources" element={<PrivateRoute element={<Resources />} />} />
//           <Route path="/fostering" element={<PrivateRoute element={<Fostering />} />} />
//           <Route path="/account" element={<PrivateRoute element={<Account />} />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<SignUp />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;



// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./components/Home";
// import Maps from "./components/Maps";
// import Community from "./components/Community";
// import Resources from "./components/Resources";
// import Fostering from "./components/Fostering";
// import Account from "./components/Account";
// import SignUp from "./components/SignUp";
// import Login from "./components/Login";
// import PrivateRoute from "./components/PrivateRoute";
// import Navbar from "./components/Navbar";

// const App = () => {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<PrivateRoute element={<Home />} />} />
//         <Route path="/maps" element={<PrivateRoute element={<Maps />} />} />
//         <Route path="/community" element={<PrivateRoute element={<Community />} />} />
//         <Route path="/resources" element={<PrivateRoute element={<Resources />} />} />
//         <Route path="/fostering" element={<PrivateRoute element={<Fostering />} />} />
//         <Route path="/account" element={<PrivateRoute element={<Account />} />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;




// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./components/Home";
// import Maps from "./components/Maps";
// import Community from "./components/Community";
// import Resources from "./components/Resources";
// import Fostering from "./components/Fostering";
// import Account from "./components/Account";
// import SignUp from "./components/SignUp";
// import Login from "./components/Login";
// import PrivateRoute from "./components/PrivateRoute";
// import Navbar from "./components/Navbar";
// import { AuthProvider } from "./context/AuthContext"; // Wrap AuthProvider
// import TestAdminAccess from "./components/TestAdminAccess";
// import AddAnnouncement from "./components/AddAnnouncement";
// import ViewAnnouncements from "./components/ViewAnnouncements";


// const App = () => {
//   return (
//     <AuthProvider>
//       <Router>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<PrivateRoute element={<Home />} />} />
//           <Route path="/maps" element={<PrivateRoute element={<Maps />} />} />
//           <Route path="/community" element={<PrivateRoute element={<Community />} />} />
//           <Route path="/resources" element={<PrivateRoute element={<Resources />} />} />
//           <Route path="/fostering" element={<PrivateRoute element={<Fostering />} />} />
//           <Route path="/account" element={<PrivateRoute element={<Account />} />} />
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/test-admin-access" element={<TestAdminAccess />} />
//           <Route path="/admin/add-announcement" element={<PrivateRoute element={<AddAnnouncement />} />} />
//           <Route path="/admin/view-announcements" element={<PrivateRoute element={<ViewAnnouncements />} />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Maps from "./components/Maps";
import Community from "./components/Community";
import Resources from "./components/Resources";
import Fostering from "./components/Fostering";
import Account from "./components/Account";
import AdminDashboard from "./components/AdminDashboard";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import Navbar from "./components/Navbar";
import AddAnnouncement from "./components/AddAnnouncement";
import ViewAnnouncements from "./components/ViewAnnouncements";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Private Routes for All Users */}
        <Route path="/" element={<PrivateRoute element={<Home />} />} />
        <Route path="/maps" element={<PrivateRoute element={<Maps />} />} />
        <Route path="/community" element={<PrivateRoute element={<Community />} />} />
        <Route path="/resources" element={<PrivateRoute element={<Resources />} />} />
        <Route path="/fostering" element={<PrivateRoute element={<Fostering />} />} />
        <Route path="/account" element={<PrivateRoute element={<Account />} />} />

        {/* Admin-Only Routes */}
        <Route path="/admin" element={<AdminRoute element={<AdminDashboard />} />} />
        <Route path="/admin/add-announcement" element={<AdminRoute element={<AddAnnouncement />} />} />
        <Route path="/admin/view-announcements" element={<AdminRoute element={<ViewAnnouncements />} />} />

      </Routes>
    </Router>
  );
};

export default App;
