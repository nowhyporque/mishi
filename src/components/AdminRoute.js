import React from "react";
import { Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const AdminRoute = ({ element }) => {
  const auth = getAuth();
  const user = auth.currentUser;

  const db = getFirestore();
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const checkAdmin = async () => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists() && userDoc.data().role === "Admin") {
          setIsAdmin(true);
        }
      }
      setLoading(false);
    };

    checkAdmin();
  }, [user, db]);

  if (loading) return <p>Loading...</p>;
  return user && isAdmin ? element : <Navigate to="/" />;
};

export default AdminRoute;
