import React from "react";
import { app } from "./firebaseConfig"; // Import the named export

const FirebaseTest = () => {
  console.log("Firebase App Initialized:", app);
  return <h1>Firebase is working!</h1>;
};

export default FirebaseTest;


import { getAuth } from "firebase/auth";

const auth = getAuth();
console.log("Auth Object:", auth);
