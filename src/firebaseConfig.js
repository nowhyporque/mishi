// // firebaseConfig.js
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBR19RneJ6utY8KL50hxGNczE5xdewIr4s",
//   authDomain: "mishi-835f5.firebaseapp.com",
//   projectId: "mishi-835f5",
//   storageBucket: "mishi-835f5.firebasestorage.app",
//   messagingSenderId: "327990476344",
//   appId: "1:327990476344:web:ee08f4081bb7cc220230cd",
//   measurementId: "G-T15LFW7LWN"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";




const firebaseConfig = {
    apiKey: "AIzaSyBR19RneJ6utY8KL50hxGNczE5xdewIr4s",
    authDomain: "mishi-835f5.firebaseapp.com",
    projectId: "mishi-835f5",
    storageBucket: "mishi-835f5.firebasestorage.app",
    messagingSenderId: "327990476344",
    appId: "1:327990476344:web:ee08f4081bb7cc220230cd",
    measurementId: "G-T15LFW7LWN"
  };



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export both app and db
export { app, db };