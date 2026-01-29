import { app, db } from "../firebaseConfig";
import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore"; // ADDED: Import Firestore functions
import { useNavigate } from "react-router-dom";

const GoogleSignIn = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const db = getFirestore(); // ADDED: Get Firestore instance

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("User signed in:", user);

      // ADDED: Check if user document exists in Firestore
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        // User data exists, proceed to home (SAME AS BEFORE)
        alert(`Welcome back, ${user.displayName}!`);
        navigate("/");
      } else {
        // ADDED: User data doesn't exist, redirect to complete profile
        console.log("User data not found, redirecting to complete profile");
        navigate("/complete-profile");
      }
    } catch (error) {
      console.error("Error during Google Sign-In:", error.message);
      alert(error.message);
    }
  };

  return (
    <div>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    </div>
  );
};

export default GoogleSignIn;