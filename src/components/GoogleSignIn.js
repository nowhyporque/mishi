// import React from "react";
// import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// const GoogleSignIn = () => {
//   const handleGoogleSignIn = async () => {
//     const auth = getAuth();
//     const provider = new GoogleAuthProvider();

//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;

//       console.log("User signed in:", user);
//       alert(`Welcome, ${user.displayName}!`);
//     } catch (error) {
//       console.error("Error during Google Sign-In:", error.message);
//       alert(error.message);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleGoogleSignIn}>Sign in with Google</button>
//     </div>
//   );
// };

// export default GoogleSignIn;
import { app, db } from "../firebaseConfig";



// import React from "react";
// import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { useNavigate } from "react-router-dom";

// const GoogleSignIn = () => {
//   const navigate = useNavigate(); // Initialize the navigation hook

//   const handleGoogleSignIn = async () => {
//     const auth = getAuth();
//     const provider = new GoogleAuthProvider();

//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;

//       console.log("User signed in:", user);
//       alert(`Welcome, ${user.displayName}!`);

//       // Redirect to home page or desired route after successful login
//       navigate("/");
//     } catch (error) {
//       console.error("Error during Google Sign-In:", error.message);
//       alert(error.message);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleGoogleSignIn}>Sign in with Google</button>
//     </div>
//   );
// };

// export default GoogleSignIn;










// import React from "react";
// import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { getFirestore, doc, setDoc } from "firebase/firestore";


// const GoogleSignIn = () => {
//   const handleGoogleSignIn = async () => {
//     const auth = getAuth();
//     const provider = new GoogleAuthProvider();

//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;

//       console.log("User signed in:", user);

//       // Save user info in Firestore
//       const userRef = doc(db, "users", user.uid);
//       await setDoc(userRef, {
//         uid: user.uid,
//         email: user.email,
//         displayName: user.displayName,
//         photoURL: user.photoURL,
//         createdAt: new Date(),
//       }, { merge: true });

//       alert(`Welcome, ${user.displayName || user.email}!`);
//     } catch (error) {
//       console.error("Error during Google Sign-In:", error.message);
//       alert(error.message);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleGoogleSignIn}>Sign in with Google</button>
//     </div>
//   );
// };

// export default GoogleSignIn;



import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const GoogleSignIn = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleGoogleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("User signed in:", user);
      alert(`Welcome, ${user.displayName}!`);
      navigate("/"); // Redirect to Home page after successful login
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
