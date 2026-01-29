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
import CompleteProfile from "./components/CompleteProfile";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/complete-profile" element={<PrivateRoute element={<CompleteProfile />} />} />

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
