import { app, db } from "../firebaseConfig";

import { getAuth } from "firebase/auth";
import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
const auth = getAuth(app);


const Maps = () => {
  const center = { lat: 40.7128, lng: -74.0060 }; // NYC coordinates

  // Load the Google Maps API
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAUzt3NWP3XVHt7VCcuE1dostoX2ZDYEek", // Replace with your API key
  });

  if (loadError) {
    return <p>Error loading maps. Please check your API key and connection.</p>;
  }

  if (!isLoaded) {
    return <p>Loading map...</p>;
  }

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '100vh' }}
      center={center}
      zoom={12}
    >
      <Marker position={center} />
    </GoogleMap>
  );
};

export default Maps;
