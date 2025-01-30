import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, setPersistence, browserLocalPersistence } from "firebase/auth";

// Create the AuthContext
const AuthContext = createContext();

// Export the useAuth hook for easy access
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap your app
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    // Set Firebase session persistence to browser local storage
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        // Monitor the user's authentication state
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setCurrentUser(user); // Set the current user if logged in
          setLoading(false);    // Stop loading when auth state is known
        });

        // Clean up the listener when the component unmounts
        return unsubscribe;
      })
      .catch((error) => {
        console.error("Error setting session persistence:", error.message);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {!loading && children} {/* Render children only after loading is complete */}
    </AuthContext.Provider>
  );
};
