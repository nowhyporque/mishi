import { app, db } from "/Users/kevinvilla/Desktop/mishi/src/firebaseConfig.js";
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
