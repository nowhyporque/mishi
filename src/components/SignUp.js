// import React, { useState } from "react";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import { db } from "../firebaseConfig";

// const SignUp = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const auth = getAuth();

//   const handleSignUp = async () => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       // Save user data to Firestore
//       await setDoc(doc(db, "users", user.uid), {
//         email: user.email,
//         createdAt: new Date(),
//       });

//       alert("Account created successfully!");
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>Sign Up</h1>
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
//       <button onClick={handleSignUp}>Sign Up</button>
//     </div>
//   );
// };

// export default SignUp;




// import React, { useState } from "react";
// import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { getFirestore, doc, setDoc } from "firebase/firestore";

// const SignUp = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [dob, setDob] = useState("");
//   const [address, setAddress] = useState("");
//   const [sex, setSex] = useState("");
//   const [age, setAge] = useState("");

//   const auth = getAuth();
//   const db = getFirestore();

//   const handleSignUp = async () => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       // Update the user's display name
//       await updateProfile(user, { displayName: name });

//       // Save additional user info in Firestore
//       await setDoc(doc(db, "users", user.uid), {
//         name,
//         dob,
//         address,
//         sex,
//         age,
//         email,
//       });

//       alert("Sign up successful!");
//     } catch (error) {
//       console.error("Sign up error:", error.message);
//       alert(error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>Sign Up</h1>
//       <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
//       <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//       <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       <input type="date" placeholder="Date of Birth" value={dob} onChange={(e) => setDob(e.target.value)} />
//       <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
//       <input type="text" placeholder="Sex" value={sex} onChange={(e) => setSex(e.target.value)} />
//       <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
//       <button onClick={handleSignUp}>Sign Up</button>
//     </div>
//   );
// };

// export default SignUp;


// import React, { useState } from "react";
// import { getAuth, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { getFirestore, doc, setDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";

// const SignUp = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [dob, setDob] = useState("");
//   const [address, setAddress] = useState("");
//   const [sex, setSex] = useState("");
//   const [age, setAge] = useState("");
//   const navigate = useNavigate();
//   const auth = getAuth();
//   const db = getFirestore();

//   const handleEmailSignUp = async () => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       // Update display name and save user details in Firestore
//       await updateProfile(user, { displayName: name });
//       await setDoc(doc(db, "users", user.uid), {
//         name,
//         email,
//         dob,
//         address,
//         sex,
//         age,
//         createdAt: new Date(),
//       });

//       alert("Sign-Up Successful! Redirecting...");
//       navigate("/"); // Redirect to home
//     } catch (error) {
//       console.error("Sign-Up Error:", error.message);
//       alert(error.message);
//     }
//   };

//   const handleGoogleSignUp = async () => {
//     const provider = new GoogleAuthProvider();
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;

//       // Save user details in Firestore
//       await setDoc(doc(db, "users", user.uid), {
//         name: user.displayName || "Not provided",
//         email: user.email,
//         dob: dob || "Not provided",
//         address: address || "Not provided",
//         sex: sex || "Not provided",
//         age: age || "Not provided",
//         createdAt: new Date(),
//       });

//       alert(`Welcome, ${user.displayName || "User"}!`);
//       navigate("/"); // Redirect to home
//     } catch (error) {
//       console.error("Google Sign-Up Error:", error.message);
//       alert(error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>Sign Up</h1>
//       <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
//       <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//       <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       <input type="date" placeholder="Date of Birth" value={dob} onChange={(e) => setDob(e.target.value)} />
//       <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
//       <input type="text" placeholder="Sex" value={sex} onChange={(e) => setSex(e.target.value)} />
//       <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
//       <button onClick={handleEmailSignUp}>Sign Up with Email</button>
//       <button onClick={handleGoogleSignUp}>Sign Up with Google</button>
//     </div>
//   );
// };

// export default SignUp;



import { app, db } from "/Users/kevinvilla/Desktop/mishi/src/firebaseConfig.js";


// import React, { useState } from "react";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import GoogleSignIn from "./GoogleSignIn";

// const SignUp = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const auth = getAuth();

//   const handleSignUp = async () => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       console.log("User signed up:", userCredential.user);
//       alert("Account created successfully!");
//     } catch (error) {
//       console.error("Error during sign-up:", error.message);
//       alert(error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>Sign Up</h1>
//       <div>
//         <h3>Sign up with Email</h3>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button onClick={handleSignUp}>Sign Up</button>
//       </div>

//       <hr />

//       <div>
//         <h3>Or Sign up with Google</h3>
//         <GoogleSignIn />
//       </div>
//     </div>
//   );
// };

// export default SignUp;
















// import React, { useState } from "react";
// import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { useNavigate } from "react-router-dom";

// const SignUp = () => {
//   const [isGoogleSignUp, setIsGoogleSignUp] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [dob, setDob] = useState("");
//   const [address, setAddress] = useState("");
//   const [age, setAge] = useState("");
//   const [sex, setSex] = useState("");
//   const [error, setError] = useState("");

//   const auth = getAuth();
//   const navigate = useNavigate();

//   // Validate all required fields
//   const validateFields = () => {
//     if (!name || !dob || !address || !age || !sex) {
//       setError("All fields are required.");
//       return false;
//     }
//     if (!isGoogleSignUp && (!email || !password)) {
//       setError("Email and password are required for email sign-up.");
//       return false;
//     }
//     setError(""); // Clear any previous errors
//     return true;
//   };

//   const handleEmailSignUp = async () => {
//     if (!validateFields()) return;

//     try {
//       const result = await createUserWithEmailAndPassword(auth, email, password);
//       console.log("User signed up:", result.user);

//       // Store demographic data if needed in Firestore or Realtime Database here.
//       alert("Account created successfully!");
//       navigate("/"); // Redirect to Home after successful sign-up
//     } catch (error) {
//       console.error("Error signing up:", error.message);
//       alert(error.message);
//     }
//   };

//   const handleGoogleSignUp = async () => {
//     if (!validateFields()) return;

//     try {
//       const provider = new GoogleAuthProvider();
//       const result = await signInWithPopup(auth, provider);
//       console.log("Google User signed up:", result.user);

//       // Store demographic data if needed in Firestore or Realtime Database here.
//       alert(`Welcome, ${result.user.displayName || "User"}!`);
//       navigate("/"); // Redirect to Home after successful Google sign-up
//     } catch (error) {
//       console.error("Error during Google Sign-Up:", error.message);
//       alert(error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>Sign Up</h1>
//       {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message */}
//       {isGoogleSignUp ? (
//         <div>
//           <p>Sign up with Google</p>
//           <button onClick={handleGoogleSignUp}>Sign up with Google</button>
//         </div>
//       ) : (
//         <div>
//           <p>Sign up with Email</p>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//       )}

//       <div>
//         <input
//           type="text"
//           placeholder="Full Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//           type="date"
//           placeholder="Date of Birth"
//           value={dob}
//           onChange={(e) => setDob(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Address"
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Age"
//           value={age}
//           onChange={(e) => setAge(e.target.value)}
//         />
//         <select value={sex} onChange={(e) => setSex(e.target.value)}>
//           <option value="" disabled>
//             Select Sex
//           </option>
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//           <option value="Other">Other</option>
//         </select>
//         <button onClick={isGoogleSignUp ? handleGoogleSignUp : handleEmailSignUp}>
//           Create Account
//         </button>
//       </div>
//       <hr />
//       <button onClick={() => setIsGoogleSignUp(!isGoogleSignUp)}>
//         {isGoogleSignUp ? "Sign up with Email" : "Sign up with Google"}
//       </button>
//     </div>
//   );
// };

// export default SignUp;













// import React, { useState } from "react";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { getFirestore, doc, setDoc } from "firebase/firestore";

// const SignUp = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [dob, setDob] = useState("");
//   const [address, setAddress] = useState("");
//   const [age, setAge] = useState("");
//   const [sex, setSex] = useState("");
//   const auth = getAuth();
//   const db = getFirestore();

//   const handleSignUp = async () => {
//     if (!email || !password || !name || !dob || !address || !age || !sex) {
//       alert("Please fill out all fields.");
//       return;
//     }

//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       // Save user data to Firestore
//       const userRef = doc(db, "users", user.uid);
//       await setDoc(userRef, {
//         name,
//         email,
//         dob,
//         address,
//         age,
//         sex,
//       });

//       alert("Account created successfully!");
//     } catch (error) {
//       console.error("Error signing up:", error.message);
//       alert(error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>Sign Up</h1>
//       <input
//         type="text"
//         placeholder="Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
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
//       <input
//         type="date"
//         placeholder="Date of Birth"
//         value={dob}
//         onChange={(e) => setDob(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Address"
//         value={address}
//         onChange={(e) => setAddress(e.target.value)}
//       />
//       <input
//         type="number"
//         placeholder="Age"
//         value={age}
//         onChange={(e) => setAge(e.target.value)}
//       />
//       <select value={sex} onChange={(e) => setSex(e.target.value)}>
//         <option value="">Select Sex</option>
//         <option value="Male">Male</option>
//         <option value="Female">Female</option>
//         <option value="Other">Other</option>
//       </select>
//       <button onClick={handleSignUp}>Sign Up</button>
//     </div>
//   );
// };

// export default SignUp;



// import React, { useState, useEffect } from "react";
// import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { getFirestore, doc, setDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";

// const SignUp = () => {
//   const [isGoogleSignUp, setIsGoogleSignUp] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [dob, setDob] = useState("");
//   const [address, setAddress] = useState("");
//   const [age, setAge] = useState("");
//   const [sex, setSex] = useState("");
//   const [error, setError] = useState("");

//   const auth = getAuth();
//   const db = getFirestore();
//   const navigate = useNavigate();

//   // Redirect if already logged in
//   useEffect(() => {
//     const user = auth.currentUser;
//     if (user) {
//       navigate("/"); // Redirect to Home if logged in
//     }
//   }, [auth, navigate]);

//   const validateFields = () => {
//     if (!name || !dob || !address || !age || !sex) {
//       setError("All fields are required.");
//       return false;
//     }
//     if (!isGoogleSignUp && (!email || !password)) {
//       setError("Email and password are required for email sign-up.");
//       return false;
//     }
//     setError("");
//     return true;
//   };

//   const handleEmailSignUp = async () => {
//     if (!validateFields()) return;

//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       const userRef = doc(db, "users", user.uid);
//       await setDoc(userRef, { name, email, dob, address, age, sex });

//       alert("Account created successfully!");
//       navigate("/"); // Redirect to Home after sign-up
//     } catch (error) {
//       console.error("Error signing up:", error.message);
//       alert(error.message);
//     }
//   };

//   const handleGoogleSignUp = async () => {
//     if (!validateFields()) return;

//     try {
//       const provider = new GoogleAuthProvider();
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;

//       const userRef = doc(db, "users", user.uid);
//       await setDoc(userRef, { name, email: user.email, dob, address, age, sex });

//       alert(`Welcome, ${user.displayName || "User"}!`);
//       navigate("/"); // Redirect to Home after sign-up
//     } catch (error) {
//       console.error("Error during Google Sign-Up:", error.message);
//       alert(error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>Sign Up</h1>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {isGoogleSignUp ? (
//         <div>
//           <p>Sign up with Google</p>
//           <button onClick={handleGoogleSignUp}>Sign up with Google</button>
//         </div>
//       ) : (
//         <div>
//           <p>Sign up with Email</p>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//       )}

//       <div>
//         <input
//           type="text"
//           placeholder="Full Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//           type="date"
//           placeholder="Date of Birth"
//           value={dob}
//           onChange={(e) => setDob(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Address"
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Age"
//           value={age}
//           onChange={(e) => setAge(e.target.value)}
//         />
//         <select value={sex} onChange={(e) => setSex(e.target.value)}>
//           <option value="">Select Sex</option>
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//           <option value="Other">Other</option>
//         </select>
//         <button onClick={isGoogleSignUp ? handleGoogleSignUp : handleEmailSignUp}>
//           Create Account
//         </button>
//       </div>
//       <hr />
//       <button onClick={() => setIsGoogleSignUp(!isGoogleSignUp)}>
//         {isGoogleSignUp ? "Sign up with Email" : "Sign up with Google"}
//       </button>
//     </div>
//   );
// };

// export default SignUp;




// import React, { useState } from "react";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { getFirestore, doc, setDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";

// const SignUp = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [dob, setDob] = useState("");
//   const [address, setAddress] = useState("");
//   const [age, setAge] = useState("");
//   const [sex, setSex] = useState("");
//   const auth = getAuth();
//   const db = getFirestore();
//   const navigate = useNavigate();

//   const handleSignUp = async () => {
//     if (!email || !password || !name || !dob || !address || !age || !sex) {
//       alert("Please fill out all fields.");
//       return;
//     }

//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       // Save user data to Firestore with role
//       const userRef = doc(db, "users", user.uid);
//       await setDoc(userRef, {
//         name,
//         email,
//         dob,
//         address,
//         age,
//         sex,
//         role: "Regular User", // Default role
//       });

//       alert("Account created successfully!");
//       navigate("/"); // Redirect to Home after successful signup
//     } catch (error) {
//       console.error("Error signing up:", error.message);
//       alert(error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>Sign Up</h1>
//       <input
//         type="text"
//         placeholder="Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
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
//       <input
//         type="date"
//         placeholder="Date of Birth"
//         value={dob}
//         onChange={(e) => setDob(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Address"
//         value={address}
//         onChange={(e) => setAddress(e.target.value)}
//       />
//       <input
//         type="number"
//         placeholder="Age"
//         value={age}
//         onChange={(e) => setAge(e.target.value)}
//       />
//       <select value={sex} onChange={(e) => setSex(e.target.value)}>
//         <option value="">Select Sex</option>
//         <option value="Male">Male</option>
//         <option value="Female">Female</option>
//         <option value="Other">Other</option>
//       </select>
//       <button onClick={handleSignUp}>Sign Up</button>
//     </div>
//   );
// };

// export default SignUp;



import React, { useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [isGoogleSignUp, setIsGoogleSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [error, setError] = useState("");

  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();

  // Redirect to Home if already logged in
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      navigate("/"); // Redirect to Home if logged in
    }
  }, [auth, navigate]);

  // Validate all required fields
  const validateFields = () => {
    if (!name || !dob || !address || !age || !sex) {
      setError("All fields are required.");
      return false;
    }
    if (!isGoogleSignUp && (!email || !password)) {
      setError("Email and password are required for email sign-up.");
      return false;
    }
    setError("");
    return true;
  };

  // Handle email/password sign-up
  const handleEmailSignUp = async () => {
    if (!validateFields()) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user data to Firestore
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        name,
        email,
        dob,
        address,
        age,
        sex,
        role: "Regular User", // Default role
      });

      alert("Account created successfully!");
      navigate("/"); // Redirect to Home after sign-up
    } catch (error) {
      console.error("Error signing up:", error.message);
      alert(error.message);
    }
  };

  // Handle Google sign-up
  const handleGoogleSignUp = async () => {
    if (!validateFields()) return;

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Save user data to Firestore
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        name,
        email: user.email,
        dob,
        address,
        age,
        sex,
        role: "Regular User", // Default role
      });

      alert(`Welcome, ${user.displayName || "User"}!`);
      navigate("/"); // Redirect to Home after sign-up
    } catch (error) {
      console.error("Error during Google Sign-Up:", error.message);
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {isGoogleSignUp ? (
        <div>
          <p>Sign up with Google</p>
          <button onClick={handleGoogleSignUp}>Sign up with Google</button>
        </div>
      ) : (
        <div>
          <p>Sign up with Email</p>
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
        </div>
      )}

      <div>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="date"
          placeholder="Date of Birth"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <select value={sex} onChange={(e) => setSex(e.target.value)}>
          <option value="">Select Sex</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <button onClick={isGoogleSignUp ? handleGoogleSignUp : handleEmailSignUp}>
          Create Account
        </button>
      </div>
      <hr />
      <button onClick={() => setIsGoogleSignUp(!isGoogleSignUp)}>
        {isGoogleSignUp ? "Sign up with Email" : "Sign up with Google"}
      </button>
    </div>
  );
};

export default SignUp;
