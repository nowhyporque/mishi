import { app, db } from "../firebaseConfig";
import React, { useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const TestAdminAccess = () => {
  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const adminDocRef = doc(db, "adminData", "someTestDocument");
          const adminDoc = await getDoc(adminDocRef);
          console.log("Admin Data:", adminDoc.data());
        }
      } catch (error) {
        console.error("Error accessing admin data:", error.message);
        alert("Permission Denied: You do not have access to this data.");
      }
    };

    fetchAdminData();
  }, [auth, db]);

  return <p>Testing admin data access...</p>;
};

export default TestAdminAccess;
