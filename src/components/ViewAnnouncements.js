import { app, db } from "../firebaseConfig";
import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const ViewAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const db = getFirestore();

      try {
        const querySnapshot = await getDocs(collection(db, "adminData"));
        const announcementsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAnnouncements(announcementsData);
      } catch (error) {
        console.error("Error fetching announcements:", error.message);
        setError("Failed to fetch announcements. Please try again.");
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div>
      <h1>Announcements</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {announcements.map((announcement) => (
          <li key={announcement.id}>
            <h3>{announcement.title}</h3>
            <p>{announcement.content}</p>
            <p>
              <small>Created At: {new Date(announcement.createdAt).toLocaleString()}</small>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewAnnouncements;
