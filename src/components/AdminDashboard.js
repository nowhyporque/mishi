
import { app, db } from "../firebaseConfig";
import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState([]);
  const [loading, setLoading] = useState(true);
  const db = getFirestore();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const adminDataCollection = collection(db, "adminData"); // Access the /adminData collection
        const adminDataSnapshot = await getDocs(adminDataCollection);
        const data = adminDataSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAdminData(data);
      } catch (error) {
        console.error("Error fetching admin data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [db]);

  if (loading) return <p>Loading admin data...</p>;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        {adminData.map((item) => (
          <li key={item.id}>
            <strong>ID:</strong> {item.id} <br />
            <strong>Data:</strong> {JSON.stringify(item)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
