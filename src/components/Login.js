// import React, { useState } from "react";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const auth = getAuth();

//   const handleLogin = async () => {
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       alert("Logged in successfully!");
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>Login</h1>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// };

// export default Login;



import { app, db } from "../firebaseConfig";
// import React, { useState } from "react";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import GoogleSignIn from "./GoogleSignIn"; // Import the Google Sign-In Component

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const auth = getAuth();

//   const handleLogin = async () => {
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       console.log("User logged in:", userCredential.user);
//       alert("Logged in successfully!");
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>Login</h1>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleLogin}>Login</button>

//       <hr />
//       <GoogleSignIn /> {/* Add the Google Sign-In button */}
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import GoogleSignIn from "./GoogleSignIn";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", userCredential.user);
      alert("Logged in successfully!");
    } catch (error) {
      console.error("Error during login:", error.message);
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <div>
        <h3>Login with Email</h3>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>

      <hr />

      <div>
        <h3>Or Login with Google</h3>
        <GoogleSignIn />
      </div>
    </div>
  );
};

export default Login;
