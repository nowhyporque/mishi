import { app, db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import React from 'react';
const auth = getAuth(app);
const Resources = () => {
  return (
    <div>
      <h1>Resources</h1>
      <p>Find helpful information about free/affordable vet services, clinics, and food banks.</p>
      <ul>
        <li><a href="#">Local Spay/Neuter Clinics</a></li>
        <li><a href="#">Affordable Vaccination Programs</a></li>
        <li><a href="#">Pet Food Assistance</a></li>
      </ul>
    </div>
  );
};

export default Resources;
