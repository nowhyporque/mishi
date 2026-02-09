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
import AddAnnouncement from "./components/AddAnnouncement";
import ViewAnnouncements from "./components/ViewAnnouncements";
import CompleteProfile from "./components/CompleteProfile";
import Layout from "./components/Layout";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes (NO SIDEBAR) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/complete-profile" element={<PrivateRoute element={<CompleteProfile />} />} />

        {/* Private Routes for All Users (WITH PURPLE SIDEBAR) */}
        <Route path="/" element={<PrivateRoute element={<Layout><Home /></Layout>} />} />
        <Route path="/home" element={<PrivateRoute element={<Layout><Home /></Layout>} />} />
        <Route path="/maps" element={<PrivateRoute element={<Layout><Maps /></Layout>} />} />
        <Route path="/community" element={<PrivateRoute element={<Layout><Community /></Layout>} />} />
        <Route path="/resources" element={<PrivateRoute element={<Layout><Resources /></Layout>} />} />
        <Route path="/fostering" element={<PrivateRoute element={<Layout><Fostering /></Layout>} />} />
        <Route path="/account" element={<PrivateRoute element={<Layout><Account /></Layout>} />} />

        {/* Admin-Only Routes (WITH PURPLE SIDEBAR) */}
        <Route path="/admin" element={<AdminRoute element={<Layout><AdminDashboard /></Layout>} />} />
        <Route path="/admin/add-announcement" element={<AdminRoute element={<Layout><AddAnnouncement /></Layout>} />} />
        <Route path="/admin/view-announcements" element={<AdminRoute element={<Layout><ViewAnnouncements /></Layout>} />} />
      </Routes>
    </Router>
  );
};

export default App;