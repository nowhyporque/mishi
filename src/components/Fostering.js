import { app, db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import React from 'react';
const auth = getAuth(app);


const Fostering = () => {
  return (
    <div>
      <h1>Fostering Opportunities</h1>
      <p>Help give stray kittens a safe and loving temporary home.</p>
      <button onClick={() => alert('Apply to Foster')}>Apply to Foster</button>
      <p>Check out available cats for fostering below:</p>
      <ul>
        <li>Kitten 1: Description</li>
        <li>Kitten 2: Description</li>
        <li>Kitten 3: Description</li>
      </ul>
    </div>
  );
};

export default Fostering;
