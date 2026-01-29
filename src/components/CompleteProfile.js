import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const CompleteProfile = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !dob || !address || !age || !sex) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);

    try {
      const user = auth.currentUser;

      if (!user) {
        setError("You must be logged in to complete your profile.");
        setLoading(false);
        return;
      }

      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        name,
        email: user.email,
        dob,
        address,
        age: parseInt(age),
        sex,
        role: "Regular User",
        createdAt: new Date().toISOString(),
      });

      alert("Profile completed successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error saving profile:", error.message);
      setError("Failed to save profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h1>Complete Your Profile</h1>
      <p>Please provide the following information to continue:</p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ display: "block", width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="date"
          placeholder="Date of Birth"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
          style={{ display: "block", width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          style={{ display: "block", width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          style={{ display: "block", width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <select
          value={sex}
          onChange={(e) => setSex(e.target.value)}
          required
          style={{ display: "block", width: "100%", padding: "10px", marginBottom: "10px" }}
        >
          <option value="">Select Sex</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: loading ? "#ccc" : "#4CAF50",
            color: "white",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Saving..." : "Complete Profile"}
        </button>
      </form>
    </div>
  );
};

export default CompleteProfile;