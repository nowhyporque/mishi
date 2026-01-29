import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBkZowfWWfKEtzHjfMDwocwj4nAXLMSGgk",
  authDomain: "mishi-db445.firebaseapp.com",
  projectId: "mishi-db445",
  storageBucket: "mishi-db445.firebasestorage.app",
  messagingSenderId: "401657833268",
  appId: "1:401657833268:web:c689bf42f6ae47e386e761",
  measurementId: "G-WDVDZD1BQZ"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export both app and db
export { app, db };