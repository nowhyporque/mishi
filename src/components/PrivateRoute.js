// import React from "react";
// import { Navigate } from "react-router-dom";
// import { getAuth } from "firebase/auth";

// const PrivateRoute = ({ element }) => {
//   const auth = getAuth();
//   const user = auth.currentUser;

//   return user ? element : <Navigate to="/login" />;
// };

// export default PrivateRoute;



// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext"; // Use AuthContext

// const PrivateRoute = ({ element }) => {
//   const { currentUser } = useAuth(); // Get the current user from AuthContext

//   return currentUser ? element : <Navigate to="/login" />; // Redirect to login if not authenticated
// };

// export default PrivateRoute;


import { app, db } from "../firebaseConfig";

// import { getAuth } from "firebase/auth";
// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";


// const auth = getAuth(app);

// const PrivateRoute = ({ element }) => {
//   const { currentUser } = useAuth();
//   return currentUser ? element : <Navigate to="/signup" />;
// };

// export default PrivateRoute;


// import React from "react";
// import { Navigate } from "react-router-dom";
// import { getAuth } from "firebase/auth";
// import { getFirestore, doc, getDoc } from "firebase/firestore";

// const PrivateRoute = ({ element }) => {
//   const auth = getAuth();
//   const user = auth.currentUser;

//   const db = getFirestore();
//   const [isAdmin, setIsAdmin] = React.useState(false);
//   const [loading, setLoading] = React.useState(true);

//   React.useEffect(() => {
//     const checkAdmin = async () => {
//       if (user) {
//         const userRef = doc(db, "users", user.uid);
//         const userDoc = await getDoc(userRef);
//         if (userDoc.exists() && userDoc.data().role === "Admin") {
//           setIsAdmin(true);
//         }
//       }
//       setLoading(false);
//     };

//     checkAdmin();
//   }, [user]);

//   if (loading) return <p>Loading...</p>;
//   return user && isAdmin ? element : <Navigate to="/" />;
// };

// export default PrivateRoute;


import React from "react";
import { Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const PrivateRoute = ({ element }) => {
  const auth = getAuth();
  const user = auth.currentUser;

  return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
