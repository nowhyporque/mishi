import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, Circle } from '@react-google-maps/api';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';

const Maps = () => {
  const navigate = useNavigate();
  const location = useLocation();
 const searchParams = new URLSearchParams(location.search);
const isEditMode = searchParams.get('mode') === 'editZone';
const tabParam = searchParams.get('tab');

const [activeTab, setActiveTab] = useState(tabParam || 'cats');
  const [markers, setMarkers] = useState([]);
  const [helperZones, setHelperZones] = useState([]);
  const [myHelperZone, setMyHelperZone] = useState(null);
  const [newMarkerPosition, setNewMarkerPosition] = useState(null);
  const [showCatForm, setShowCatForm] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);
  const [catFormData, setCatFormData] = useState({ 
    type: 'stray',
    description: '', 
    status: 'active',
    isSOS: false 
  });
  const [helperFormData, setHelperFormData] = useState({
    radius: 1,
    helpOffered: {
      food: false,
      shelter: false,
      tnr: false,
      fostering: false,
      transport: false,
      other: ''
    },
    availability: ''
  });
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
      if (!isEditMode) {
        // Normal mode: load everything
        loadMarkers();
        loadHelperZones();
      } else {
        // Edit mode: only load user's existing zone for editing
        loadMyHelperZoneOnly();
        setActiveTab('helpers');
      }
      getUserLocation();
    }
  }, [isLoaded, isEditMode]);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLoc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          
          if (mapRef.current) {
            mapRef.current.panTo(userLoc);
            mapRef.current.setZoom(13);
          }
        },
        (error) => {
          console.log('User denied location or error:', error);
        }
      );
    }
  };

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

  const loadHelperZones = async () => {
    try {
      const helpersCollection = collection(db, 'helperZones');
      const snapshot = await getDocs(helpersCollection);
      const loadedZones = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setHelperZones(loadedZones);
      
      const user = auth.currentUser;
      if (user) {
        const myZone = loadedZones.find(zone => zone.userId === user.uid);
        setMyHelperZone(myZone || null);
      }
      
      console.log(`Loaded ${loadedZones.length} helper zones`);
    } catch (error) {
      console.error('Error loading helper zones:', error);
    }
  };

  const loadMyHelperZoneOnly = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const helpersCollection = collection(db, 'helperZones');
      const snapshot = await getDocs(helpersCollection);
      const myZone = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .find(zone => zone.userId === user.uid);
      
      if (myZone) {
        setMyHelperZone(myZone);
        setNewMarkerPosition({
          lat: myZone.location.lat,
          lng: myZone.location.lng
        });
        setHelperFormData({
          radius: myZone.radius,
          helpOffered: myZone.helpOffered,
          availability: myZone.availability || ''
        });
      }
    } catch (error) {
      console.error('Error loading my helper zone:', error);
    }
  };

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setNewMarkerPosition({ lat, lng });
    
    if (activeTab === 'cats' && !isEditMode) {
      setShowCatForm(true);
      setCatFormData({ type: 'stray', description: '', status: 'active', isSOS: false });
    }
  };

  const handleCatSubmit = async (e) => {
    e.preventDefault();
    
    if (!catFormData.description.trim()) {
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
        type: catFormData.type,
        description: catFormData.description,
        status: catFormData.status,
        isSOS: catFormData.isSOS,
        reportedBy: user ? user.uid : 'anonymous',
        reportedAt: serverTimestamp(),
      });

      alert('Cat sighting reported successfully!');
      window.location.reload(); // Reload to show new pin
      
    } catch (error) {
      console.error('Error saving:', error);
      alert('Failed to save. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleHelperSubmit = async (e) => {
    e.preventDefault();
    
    if (!newMarkerPosition) {
      alert('Please click on the map to set your helper zone location');
      return;
    }

    const hasHelp = Object.values(helperFormData.helpOffered).some(v => v === true || (typeof v === 'string' && v.trim()));
    if (!hasHelp) {
      alert('Please select at least one type of help you can offer');
      return;
    }

    setLoading(true);

    try {
      const user = auth.currentUser;
      if (!user) {
        alert('You must be logged in to add a helper zone');
        return;
      }

      const zoneData = {
        location: {
          lat: newMarkerPosition.lat,
          lng: newMarkerPosition.lng
        },
        radius: helperFormData.radius,
        helpOffered: helperFormData.helpOffered,
        availability: helperFormData.availability,
        userId: user.uid,
        userEmail: user.email,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      if (myHelperZone) {
        await updateDoc(doc(db, 'helperZones', myHelperZone.id), zoneData);
        alert('Helper zone updated successfully!');
      } else {
        await addDoc(collection(db, 'helperZones'), zoneData);
        alert('Helper zone created successfully!');
      }

      // Reload page to helpers tab
navigate('/maps?tab=helpers');
window.location.reload();
      
    } catch (error) {
      console.error('Error saving helper zone:', error);
      alert('Failed to save helper zone. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteHelperZone = async () => {
    if (!myHelperZone) return;
    
    if (!window.confirm('Are you sure you want to delete your helper zone?')) {
      return;
    }

    setLoading(true);

    try {
      await deleteDoc(doc(db, 'helperZones', myHelperZone.id));
      alert('Helper zone deleted successfully!');
      navigate('/maps?tab=helpers');
      window.location.reload();
    } catch (error) {
      console.error('Error deleting helper zone:', error);
      alert('Failed to delete helper zone. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddEditHelperZone = () => {
    // Reload page in edit mode
    navigate('/maps?mode=editZone');
    window.location.reload();
  };

  const handleCancelCat = () => {
    setShowCatForm(false);
    setNewMarkerPosition(null);
  };

  const handleCancelHelper = () => {
    // Exit edit mode, reload normally
    navigate('/maps');
    window.location.reload();
  };

  const onLoad = (map) => {
    mapRef.current = map;
  };

  const getPinColor = (type, isSOS) => {
    if (isSOS) return '#DC143C';
    switch(type) {
      case 'stray': return '#0000FF';
      case 'colony': return '#00FF00';
      case 'kitten': return '#FFA500';
      default: return '#DC143C';
    }
  };

  const createPinSVG = (pinColor, centerColor, size, isSOS = false) => {
    const animation = isSOS ? `
      <style>
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0.3; }
        }
        .blink { animation: blink 1s infinite; }
      </style>
    ` : '';
    
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size * 1.3}" viewBox="0 0 24 32">
        ${animation}
        <path class="${isSOS ? 'blink' : ''}" d="M12 0C7.6 0 4 3.6 4 8c0 5.4 8 16 8 16s8-10.6 8-16c0-4.4-3.6-8-8-8z" fill="${pinColor}"/>
        <circle cx="12" cy="8" r="3" fill="${centerColor}"/>
      </svg>
    `)}`;
  };

  const milesToMeters = (miles) => miles * 1609.34;

  if (loadError) {
    return <p>Error loading maps: {loadError.message}</p>;
  }

  if (!isLoaded) {
    return <p>Loading map...</p>;
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      {/* Tab Navigation - Hide in edit mode */}
{!isEditMode && (
  <div style={{
    position: 'absolute',
    top: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    zIndex: 100,
    display: 'flex',
    overflow: 'hidden'
  }}>
    <button
      onClick={() => {
        navigate('/maps?tab=cats');
        window.location.reload();
      }}
      style={{
        padding: '12px 24px',
        border: 'none',
        backgroundColor: activeTab === 'cats' ? '#4CAF50' : 'white',
        color: activeTab === 'cats' ? 'white' : '#333',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'all 0.3s'
      }}
    >
      🐱 Cat Sightings
    </button>
    <button
      onClick={() => {
        navigate('/maps?tab=helpers');
        window.location.reload();
      }}
      style={{
        padding: '12px 24px',
        border: 'none',
        borderLeft: '1px solid #ddd',
        backgroundColor: activeTab === 'helpers' ? '#4CAF50' : 'white',
        color: activeTab === 'helpers' ? 'white' : '#333',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'all 0.3s'
      }}
    >
      🙋 Helper Zones
    </button>
  </div>
)}

      {/* Add Helper Zone Button */}
      {!isEditMode && activeTab === 'helpers' && (
        <div style={{
          position: 'absolute',
          top: '70px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 100
        }}>
          <button
            onClick={handleAddEditHelperZone}
            style={{
              padding: '10px 20px',
              backgroundColor: myHelperZone ? '#FF9800' : '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            {myHelperZone ? '✏️ Edit My Helper Zone' : '+ Add My Helper Zone'}
          </button>
        </div>
      )}

      {/* CLEAN MAP */}
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={mapRef.current ? undefined : center}
        zoom={12}
        onClick={handleMapClick}
        onLoad={onLoad}
      >
        {/* Show NOTHING in edit mode except the zone being edited */}
        
        {/* CATS - Only in normal mode */}
        {!isEditMode && activeTab === 'cats' && markers.map((marker) => {
          const isMyReport = auth.currentUser && marker.reportedBy === auth.currentUser.uid;
          const pinColor = getPinColor(marker.type, marker.isSOS);
          const centerColor = isMyReport ? '#FFD700' : '#FFFFFF';
          
          return (
            <Marker
              key={marker.id}
              position={{ lat: marker.location.lat, lng: marker.location.lng }}
              onClick={() => setSelectedMarker(marker)}
              icon={{
                url: createPinSVG(pinColor, centerColor, isMyReport ? 40 : 32, marker.isSOS),
                scaledSize: new window.google.maps.Size(
                  isMyReport ? 40 : 32,
                  isMyReport ? 52 : 42
                )
              }}
              zIndex={marker.isSOS ? 2000 : (isMyReport ? 1000 : 1)}
            />
          );
        })}

        {/* HELPER ZONES - Only in normal mode */}
        {!isEditMode && activeTab === 'helpers' && helperZones.map((zone) => {
          const isMyZone = auth.currentUser && zone.userId === auth.currentUser.uid;
          
          return (
            <Circle
              key={zone.id}
              center={{ lat: zone.location.lat, lng: zone.location.lng }}
              radius={milesToMeters(zone.radius)}
              options={{
                fillColor: isMyZone ? '#FFD700' : '#2196F3',
                fillOpacity: isMyZone ? 0.3 : 0.2,
                strokeColor: isMyZone ? '#FFD700' : '#2196F3',
                strokeOpacity: isMyZone ? 0.8 : 0.5,
                strokeWeight: isMyZone ? 3 : 2,
                clickable: true
              }}
              onClick={() => setSelectedZone(zone)}
            />
          );
        })}

        {/* Temporary cat marker */}
        {!isEditMode && activeTab === 'cats' && newMarkerPosition && showCatForm && (() => {
          const pinColor = getPinColor(catFormData.type, catFormData.isSOS);
          return (
            <Marker 
              position={newMarkerPosition}
              icon={{
                url: createPinSVG(pinColor, '#FFD700', 40, catFormData.isSOS),
                scaledSize: new window.google.maps.Size(40, 52)
              }}
            />
          );
        })()}

        {/* Helper zone being edited */}
        {isEditMode && newMarkerPosition && (
          <Circle
            center={newMarkerPosition}
            radius={milesToMeters(helperFormData.radius)}
            options={{
              fillColor: '#FFD700',
              fillOpacity: 0.3,
              strokeColor: '#FFD700',
              strokeOpacity: 0.8,
              strokeWeight: 3,
              clickable: false
            }}
          />
        )}

        {/* Cat Info Window */}
        {!isEditMode && selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.location.lat, lng: selectedMarker.location.lng }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div style={{ maxWidth: '200px' }}>
              {selectedMarker.isSOS && (
                <div style={{ 
                  backgroundColor: '#DC143C', 
                  color: 'white', 
                  padding: '5px', 
                  borderRadius: '4px',
                  marginBottom: '10px',
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}>
                  ⚠️ EMERGENCY
                </div>
              )}
              <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>
                {selectedMarker.type === 'stray' && '🔵 Stray Cat'}
                {selectedMarker.type === 'colony' && '🟢 Cat Colony'}
                {selectedMarker.type === 'kitten' && '🟠 Kitten(s)'}
              </h3>
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

        {/* Helper Zone Info Window */}
        {!isEditMode && selectedZone && (
          <InfoWindow
            position={{ lat: selectedZone.location.lat, lng: selectedZone.location.lng }}
            onCloseClick={() => setSelectedZone(null)}
          >
            <div style={{ maxWidth: '250px' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>
                🙋 Helper Zone
              </h3>
              <p style={{ margin: '5px 0', fontSize: '14px' }}>
                <strong>Coverage:</strong> {selectedZone.radius} mile radius
              </p>
              <p style={{ margin: '5px 0', fontSize: '14px' }}>
                <strong>Help Offered:</strong>
              </p>
              <ul style={{ margin: '5px 0', paddingLeft: '20px', fontSize: '13px' }}>
                {selectedZone.helpOffered.food && <li>Provide food</li>}
                {selectedZone.helpOffered.shelter && <li>Provide shelter</li>}
                {selectedZone.helpOffered.tnr && <li>TNR assistance</li>}
                {selectedZone.helpOffered.fostering && <li>Temporary fostering</li>}
                {selectedZone.helpOffered.transport && <li>Transport to vet</li>}
                {selectedZone.helpOffered.other && <li>{selectedZone.helpOffered.other}</li>}
              </ul>
              {selectedZone.availability && (
                <p style={{ margin: '5px 0', fontSize: '13px', color: '#666' }}>
                  <strong>Availability:</strong> {selectedZone.availability}
                </p>
              )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      {/* Instructions */}
      {!isEditMode && activeTab === 'cats' && !showCatForm && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
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
      )}

      {!isEditMode && activeTab === 'helpers' && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'white',
          padding: '10px 20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          zIndex: 100,
          fontSize: '14px'
        }}>
          🙋 View helper zones or add your own to offer assistance in your area
        </div>
      )}

      {isEditMode && !newMarkerPosition && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'white',
          padding: '10px 20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          zIndex: 100,
          fontSize: '14px'
        }}>
          📍 Click on the map to set the center of your helper zone
        </div>
      )}

      {/* Cat Report Form */}
      {!isEditMode && showCatForm && (
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
          minWidth: '300px',
          maxHeight: '80vh',
          overflowY: 'auto'
        }}>
          <h2 style={{ marginTop: 0 }}>Report Cat Sighting</h2>
          
          <form onSubmit={handleCatSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                What are you reporting? *
              </label>
              <select
                value={catFormData.type}
                onChange={(e) => setCatFormData({ ...catFormData, type: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              >
                <option value="stray">🔵 Stray Cat</option>
                <option value="colony">🟢 Cat Colony</option>
                <option value="kitten">🟠 Kitten(s)</option>
              </select>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={catFormData.isSOS}
                  onChange={(e) => setCatFormData({ ...catFormData, isSOS: e.target.checked })}
                  style={{ marginRight: '8px', width: '18px', height: '18px' }}
                />
                <span style={{ fontWeight: 'bold', color: '#DC143C' }}>
                  ⚠️ SOS - Emergency (injured, trapped, urgent help needed)
                </span>
              </label>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Description *
              </label>
              <textarea
                value={catFormData.description}
                onChange={(e) => setCatFormData({ ...catFormData, description: e.target.value })}
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
                value={catFormData.status}
                onChange={(e) => setCatFormData({ ...catFormData, status: e.target.value })}
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
                onClick={handleCancelCat}
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

      {/* Helper Zone Form - Only in edit mode */}
      {isEditMode && (
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
          minWidth: '350px',
          maxHeight: '80vh',
          overflowY: 'auto'
        }}>
          <h2 style={{ marginTop: 0 }}>
            {myHelperZone ? 'Edit Helper Zone' : 'Add Helper Zone'}
          </h2>
          
          <form onSubmit={handleHelperSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Coverage Radius *
              </label>
              <select
                value={helperFormData.radius}
                onChange={(e) => setHelperFormData({ ...helperFormData, radius: parseFloat(e.target.value) })}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              >
                <option value="0.5">0.5 miles</option>
                <option value="1">1 mile</option>
                <option value="2">2 miles</option>
                <option value="3">3 miles</option>
              </select>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
                What help can you offer? * (select at least one)
              </label>
              
              <label style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={helperFormData.helpOffered.food}
                  onChange={(e) => setHelperFormData({ 
                    ...helperFormData, 
                    helpOffered: { ...helperFormData.helpOffered, food: e.target.checked }
                  })}
                  style={{ marginRight: '8px', width: '18px', height: '18px' }}
                />
                <span>Provide food</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={helperFormData.helpOffered.shelter}
                  onChange={(e) => setHelperFormData({ 
                    ...helperFormData, 
                    helpOffered: { ...helperFormData.helpOffered, shelter: e.target.checked }
                  })}
                  style={{ marginRight: '8px', width: '18px', height: '18px' }}
                />
                <span>Provide shelter</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={helperFormData.helpOffered.tnr}
                  onChange={(e) => setHelperFormData({ 
                    ...helperFormData, 
                    helpOffered: { ...helperFormData.helpOffered, tnr: e.target.checked }
                  })}
                  style={{ marginRight: '8px', width: '18px', height: '18px' }}
                />
                <span>TNR (Trap-Neuter-Return) assistance</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={helperFormData.helpOffered.fostering}
                  onChange={(e) => setHelperFormData({ 
                    ...helperFormData, 
                    helpOffered: { ...helperFormData.helpOffered, fostering: e.target.checked }
                  })}
                  style={{ marginRight: '8px', width: '18px', height: '18px' }}
                />
                <span>Temporary fostering</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={helperFormData.helpOffered.transport}
                  onChange={(e) => setHelperFormData({ 
                    ...helperFormData, 
                    helpOffered: { ...helperFormData.helpOffered, transport: e.target.checked }
                  })}
                  style={{ marginRight: '8px', width: '18px', height: '18px' }}
                />
                <span>Transport to vet</span>
              </label>

              <div style={{ marginTop: '10px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Other:</label>
                <input
                  type="text"
                  value={helperFormData.helpOffered.other}
                  onChange={(e) => setHelperFormData({ 
                    ...helperFormData, 
                    helpOffered: { ...helperFormData.helpOffered, other: e.target.value }
                  })}
                  placeholder="Specify other help..."
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Availability (optional)
              </label>
              <input
                type="text"
                value={helperFormData.availability}
                onChange={(e) => setHelperFormData({ ...helperFormData, availability: e.target.value })}
                placeholder="e.g., Weekends only, After 6pm..."
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
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
                  {loading ? 'Saving...' : (myHelperZone ? 'Update Zone' : 'Save Zone')}
                </button>
                <button
                  type="button"
                  onClick={handleCancelHelper}
                  disabled={loading}
                  style={{
                    flex: 1,
                    padding: '10px',
                    backgroundColor: '#757575',
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
              
              {myHelperZone && (
                <button
                  type="button"
                  onClick={handleDeleteHelperZone}
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Delete My Helper Zone
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Maps;