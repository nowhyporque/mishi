import { app, db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import React from 'react';
const auth = getAuth(app);


const Home = () => {
  return (
    <div>
      <h1>Welcome to Mishi 🐾</h1>
      <p>Helping stray cats find care and safety.</p>
      <button onClick={() => alert('Navigate to Maps')}>Explore Map</button>
      <button onClick={() => alert('Navigate to Flag a Sighting')}>Flag a Sighting</button>
      <button onClick={() => alert('Navigate to Fostering')}>Foster a Cat</button>
    </div>
  );
};

export default Home;
