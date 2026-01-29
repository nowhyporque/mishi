import { app, db } from "../firebaseConfig";
import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const AddAnnouncement = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const db = getFirestore();
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title || !content) {
      setError("Both fields are required.");
      return;
    }

    try {
      const user = auth.currentUser;

      if (!user) {
        setError("You must be logged in to add an announcement.");
        return;
      }

      // Add announcement to Firestore
      await addDoc(collection(db, "adminData"), {
        title,
        content,
        createdBy: user.uid,
        createdAt: new Date().toISOString(),
      });

      setSuccess("Announcement added successfully!");
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error adding announcement:", error.message);
      setError("Failed to add announcement. Please try again.");
    }
  };

  return (
    <div>
      <h1>Add Announcement</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Add Announcement</button>
      </form>
    </div>
  );
};

export default AddAnnouncement;
