import { app, db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import React from 'react';


const auth = getAuth(app);
const Community = () => {
  return (
    <div>
      <h1>Community</h1>
      <p>Share stories, tips, and updates with the Mishi community.</p>
      <ul>
        <li>Story 1: How I Helped a Kitten</li>
        <li>Story 2: Tips for Fostering Cats</li>
        <li>Story 3: A Day in the Life of a Foster Parent</li>
      </ul>
    </div>
  );
};

export default Community;
