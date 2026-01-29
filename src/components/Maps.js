import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { getFirestore, collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const Maps = () => {
  const [markers, setMarkers] = useState([]);
  const [newMarkerPosition, setNewMarkerPosition] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [formData, setFormData] = useState({ description: '', status: 'active' });
  const [loading, setLoading] = useState(false);
  const mapRef = useRef(null);
  
  const center = { lat: 40.7128, lng: -74.0060 };
  const db = getFirestore();
  const auth = getAuth();

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBgOXbiX4s77HCCTMhkikm4lwS-CLMrJkM",
  });

  useEffect(() => {
    if (isLoaded) {
      loadMarkers();
    }
  }, [isLoaded]);

  const loadMarkers = async () => {
    try {
      const catsCollection = collection(db, 'cats');
      const snapshot = await getDocs(catsCollection);
      const loadedMarkers = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMarkers(loadedMarkers);
      console.log(`Loaded ${loadedMarkers.length} cat markers`);
    } catch (error) {
      console.error('Error loading markers:', error);
    }
  };

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setNewMarkerPosition({ lat, lng });
    setShowForm(true);
    setFormData({ description: '', status: 'active' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.description.trim()) {
      alert('Please add a description');
      return;
    }

    setLoading(true);

    try {
      const user = auth.currentUser;
      
      await addDoc(collection(db, 'cats'), {
        location: {
          lat: newMarkerPosition.lat,
          lng: newMarkerPosition.lng
        },
        description: formData.description,
        status: formData.status,
        reportedBy: user ? user.uid : 'anonymous',
        reportedAt: serverTimestamp(),
      });

      alert('Cat sighting reported successfully!');
      setShowForm(false);
      setNewMarkerPosition(null);
      await loadMarkers();
      
    } catch (error) {
      console.error('Error saving:', error);
      alert('Failed to save. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setNewMarkerPosition(null);
  };

  const onLoad = (map) => {
    mapRef.current = map;
  };

  if (loadError) {
    return <p>Error loading maps: {loadError.message}</p>;
  }

  if (!isLoaded) {
    return <p>Loading map...</p>;
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={mapRef.current ? undefined : center}
        zoom={12}
        onClick={handleMapClick}
        onLoad={onLoad}
      >
        {/* Existing cat markers */}
        {markers.map((marker) => {
          const isMyReport = auth.currentUser && marker.reportedBy === auth.currentUser.uid;
          
          const createPinSVG = (centerColor, size) => {
            return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size * 1.3}" viewBox="0 0 24 32">
                <path d="M12 0C7.6 0 4 3.6 4 8c0 5.4 8 16 8 16s8-10.6 8-16c0-4.4-3.6-8-8-8z" fill="#DC143C"/>
                <circle cx="12" cy="8" r="3" fill="${centerColor}"/>
              </svg>
            `)}`;
          };
          
          return (
            <Marker
              key={marker.id}
              position={{ lat: marker.location.lat, lng: marker.location.lng }}
              onClick={() => setSelectedMarker(marker)}
              icon={{
                url: isMyReport 
                  ? createPinSVG('#FFD700', 40)
                  : createPinSVG('#000000', 32),
                scaledSize: new window.google.maps.Size(
                  isMyReport ? 40 : 32,
                  isMyReport ? 52 : 42
                )
              }}
              zIndex={isMyReport ? 1000 : 1}
            />
          );
        })}





        {/* Temporary pin while placing - shows as YOUR pin style */}
        {newMarkerPosition && (() => {
          const createPinSVG = (centerColor, size) => {
            return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size * 1.3}" viewBox="0 0 24 32">
                <path d="M12 0C7.6 0 4 3.6 4 8c0 5.4 8 16 8 16s8-10.6 8-16c0-4.4-3.6-8-8-8z" fill="#DC143C"/>
                <circle cx="12" cy="8" r="3" fill="${centerColor}"/>
              </svg>
            `)}`;
          };
          
          return (
            <Marker 
              position={newMarkerPosition}
              icon={{
                url: createPinSVG('#FFD700', 40),
                scaledSize: new window.google.maps.Size(40, 52)
              }}
            />
          );
        })()}


        {/* Info window */}
        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.location.lat, lng: selectedMarker.location.lng }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div style={{ maxWidth: '200px' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Cat Sighting</h3>
              <p style={{ margin: '5px 0', fontSize: '14px' }}>
                <strong>Description:</strong> {selectedMarker.description}
              </p>
              <p style={{ margin: '5px 0', fontSize: '14px' }}>
                <strong>Status:</strong> {selectedMarker.status}
              </p>
              <p style={{ margin: '5px 0', fontSize: '12px', color: '#666' }}>
                Reported: {selectedMarker.reportedAt ? new Date(selectedMarker.reportedAt.seconds * 1000).toLocaleDateString() : 'Unknown'}
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      {/* Instructions */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'white',
        padding: '10px 20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        zIndex: 100,
        fontSize: '14px'
      }}>
        🐱 Click anywhere on the map to report a cat sighting
      </div>

      {/* Report Form */}
      {showForm && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
          zIndex: 1000,
          minWidth: '300px'
        }}>
          <h2 style={{ marginTop: 0 }}>Report Cat Sighting</h2>
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the cat and situation..."
                rows="4"
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
                required
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              >
                <option value="active">Active / Needs Help</option>
                <option value="monitoring">Monitoring</option>
                <option value="helped">Already Helped</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor: loading ? '#ccc' : '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold'
                }}
              >
                {loading ? 'Saving...' : 'Report Cat'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                disabled={loading}
                style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Maps;