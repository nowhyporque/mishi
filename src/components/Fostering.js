import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, addDoc, collection, serverTimestamp, getDocs, query, orderBy } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Fostering = () => {
  const [view, setView] = useState('main');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [catsNeedingFoster, setCatsNeedingFoster] = useState([]);
  
  // Foster Application Form Data
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    dateOfBirth: '',
    idType: 'drivers_license',
    idNumber: '',
    idFile: null,
    housingType: 'house',
    ownOrRent: 'own',
    landlordApproval: false,
    landlordContact: '',
    priorFosterExperience: false,
    priorFosterDetails: '',
    hasPets: false,
    currentPetsDetails: '',
    hasChildren: false,
    childrenAges: '',
    maxCatsWilling: '1',
    canFosterKittens: true,
    canFosterAdult: true,
    canFosterSpecialNeeds: false,
    availableStartDate: '',
    maxFosterDuration: '1-3 months',
    reference1Name: '',
    reference1Phone: '',
    reference1Relationship: '',
    reference2Name: '',
    reference2Phone: '',
    reference2Relationship: '',
    resumeFile: null,
    veterinarianName: '',
    veterinarianPhone: '',
    agreeToHomeVisit: false,
    agreeToTerms: false,
    additionalInfo: ''
  });

  // Post Cat Form Data
  const [catPostData, setCatPostData] = useState({
    catName: '',
    age: '',
    ageUnit: 'months',
    gender: 'unknown',
    breed: '',
    color: '',
    description: '',
    specialNeeds: false,
    specialNeedsDetails: '',
    medicalHistory: '',
    temperament: '',
    goodWithKids: 'unknown',
    goodWithPets: 'unknown',
    estimatedFosterDuration: '1-3 months',
    urgency: 'medium',
    location: '',
    contactPhone: '',
    contactEmail: '',
    photos: [],
    reasonNeedingFoster: ''
  });

  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();

  useEffect(() => {
    loadUserData();
    loadCatsNeedingFoster();
  }, []);

  const loadUserData = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserData(data);
        
        setFormData(prev => ({
          ...prev,
          fullName: `${data.firstName || ''} ${data.lastName || ''}`.trim(),
          email: user.email || '',
          phone: data.phone || '',
          address: data.address || '',
          city: data.city || '',
          state: data.state || '',
          zipCode: data.zipCode || '',
          dateOfBirth: data.dateOfBirth || ''
        }));

        setCatPostData(prev => ({
          ...prev,
          contactEmail: user.email || '',
          contactPhone: data.phone || '',
          location: `${data.city || ''}, ${data.state || ''}`.trim()
        }));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const loadCatsNeedingFoster = async () => {
    try {
      const catsQuery = query(
        collection(db, 'catsNeedingFoster'),
        orderBy('postedAt', 'desc')
      );
      const snapshot = await getDocs(catsQuery);
      const cats = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCatsNeedingFoster(cats);
    } catch (error) {
      console.error('Error loading cats:', error);
    }
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      setFormData(prev => ({ ...prev, [fieldName]: file }));
    }
  };

  const handleCatPhotosChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      alert('Maximum 5 photos allowed');
      return;
    }
    
    for (let file of files) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Each photo must be less than 5MB');
        return;
      }
    }
    
    setCatPostData(prev => ({ ...prev, photos: files }));
  };

  const uploadFile = async (file, folder, subfolder = '') => {
  if (!file) return null;
  
  const user = auth.currentUser;
  const path = subfolder 
    ? `${folder}/${subfolder}/${user.uid}/${Date.now()}_${file.name}`
    : `${folder}/${user.uid}/${Date.now()}_${file.name}`;
  
  const fileRef = ref(storage, path);
  await uploadBytes(fileRef, file);
  return await getDownloadURL(fileRef);
};

  const uploadMultipleFiles = async (files, folder, subfolder = '') => {
  if (!files || files.length === 0) return [];
  
  const uploadPromises = files.map(file => uploadFile(file, folder, subfolder));
  return await Promise.all(uploadPromises);
};

  const handleFosterApplicationSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.idNumber || !formData.idFile) {
      alert('Please provide your ID number and upload a photo of your ID');
      return;
    }

    if (!formData.agreeToHomeVisit || !formData.agreeToTerms) {
      alert('You must agree to the home visit and terms to apply');
      return;
    }

    if (!formData.reference1Name || !formData.reference1Phone) {
      alert('At least one reference is required');
      return;
    }

    setLoading(true);

    try {
      const user = auth.currentUser;

      const idFileUrl = await uploadFile(formData.idFile, 'fosterApplications', 'id');
      const resumeFileUrl = await uploadFile(formData.resumeFile, 'fosterApplications', 'resume');

      const applicationData = {
        userId: user.uid,
        userEmail: user.email,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        dateOfBirth: formData.dateOfBirth,
        idType: formData.idType,
        idNumber: formData.idNumber,
        idFileUrl: idFileUrl,
        housingType: formData.housingType,
        ownOrRent: formData.ownOrRent,
        landlordApproval: formData.landlordApproval,
        landlordContact: formData.landlordContact,
        priorFosterExperience: formData.priorFosterExperience,
        priorFosterDetails: formData.priorFosterDetails,
        hasPets: formData.hasPets,
        currentPetsDetails: formData.currentPetsDetails,
        hasChildren: formData.hasChildren,
        childrenAges: formData.childrenAges,
        maxCatsWilling: formData.maxCatsWilling,
        canFosterKittens: formData.canFosterKittens,
        canFosterAdult: formData.canFosterAdult,
        canFosterSpecialNeeds: formData.canFosterSpecialNeeds,
        availableStartDate: formData.availableStartDate,
        maxFosterDuration: formData.maxFosterDuration,
        reference1: {
          name: formData.reference1Name,
          phone: formData.reference1Phone,
          relationship: formData.reference1Relationship
        },
        reference2: formData.reference2Name ? {
          name: formData.reference2Name,
          phone: formData.reference2Phone,
          relationship: formData.reference2Relationship
        } : null,
        resumeFileUrl: resumeFileUrl,
        veterinarianName: formData.veterinarianName,
        veterinarianPhone: formData.veterinarianPhone,
        additionalInfo: formData.additionalInfo,
        status: 'pending',
        submittedAt: serverTimestamp()
      };

      await addDoc(collection(db, 'fosterApplications'), applicationData);

      alert('Application submitted successfully! We will review your application and contact you within 3-5 business days.');
      setView('main');

    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePostCatSubmit = async (e) => {
    e.preventDefault();
    
    if (!catPostData.catName || !catPostData.age || !catPostData.description) {
      alert('Please fill in all required fields');
      return;
    }

    if (catPostData.photos.length === 0) {
      alert('Please upload at least one photo of the cat');
      return;
    }

    setLoading(true);

    try {
      const user = auth.currentUser;
      if (!user) {
        alert('Please log in to post a cat');
        return;
      }

      const photoUrls = await uploadMultipleFiles(catPostData.photos, 'catsNeedingFoster', 'photos');

      const catData = {
        postedBy: user.uid,
        postedByEmail: user.email,
        catName: catPostData.catName,
        age: catPostData.age,
        ageUnit: catPostData.ageUnit,
        gender: catPostData.gender,
        breed: catPostData.breed,
        color: catPostData.color,
        description: catPostData.description,
        specialNeeds: catPostData.specialNeeds,
        specialNeedsDetails: catPostData.specialNeedsDetails,
        medicalHistory: catPostData.medicalHistory,
        temperament: catPostData.temperament,
        goodWithKids: catPostData.goodWithKids,
        goodWithPets: catPostData.goodWithPets,
        estimatedFosterDuration: catPostData.estimatedFosterDuration,
        urgency: catPostData.urgency,
        location: catPostData.location,
        contactPhone: catPostData.contactPhone,
        contactEmail: catPostData.contactEmail,
        photoUrls: photoUrls,
        reasonNeedingFoster: catPostData.reasonNeedingFoster,
        status: 'available',
        postedAt: serverTimestamp()
      };

      await addDoc(collection(db, 'catsNeedingFoster'), catData);

      alert('Cat posted successfully!');
      setView('main');
      loadCatsNeedingFoster();

    } catch (error) {
      console.error('Error posting cat:', error);
      alert('Failed to post cat. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // MAIN VIEW
  if (view === 'main') {
    return (
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>Fostering Opportunities</h1>
        <p style={{ fontSize: '18px', marginBottom: '30px', lineHeight: '1.6' }}>
          Help give stray cats and kittens a safe and loving temporary home.
        </p>

        <div style={{ 
          backgroundColor: '#f0f8ff', 
          padding: '20px', 
          borderRadius: '8px', 
          marginBottom: '30px',
          border: '2px solid #4CAF50'
        }}>
          <h2 style={{ fontSize: '24px', marginBottom: '15px' }}>What is Fostering?</h2>
          <ul style={{ lineHeight: '1.8', fontSize: '16px' }}>
            <li>Provide temporary care for cats/kittens in your home</li>
            <li>We cover medical expenses and supplies</li>
            <li>Foster duration typically ranges from 2 weeks to 3 months</li>
            <li>Help socialize cats to prepare them for adoption</li>
          </ul>
        </div>

        <div style={{ display: 'flex', gap: '15px', marginBottom: '40px' }}>
          <button 
            onClick={() => setView('applyForm')}
            style={{
              flex: 1,
              padding: '15px 30px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Apply to Foster
          </button>
          <button 
            onClick={() => setView('postCat')}
            style={{
              flex: 1,
              padding: '15px 30px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Post a Cat Needing Foster
          </button>
        </div>

        <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Cats Needing Foster Care</h2>
        
        {catsNeedingFoster.length === 0 ? (
          <p style={{ fontSize: '16px', color: '#666', textAlign: 'center', padding: '40px' }}>
            No cats currently need fostering. Check back soon!
          </p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {catsNeedingFoster.map((cat) => (
              <div 
                key={cat.id}
                style={{ 
                  border: '1px solid #ddd', 
                  borderRadius: '8px', 
                  overflow: 'hidden',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                {cat.photoUrls && cat.photoUrls.length > 0 && (
                  <img 
                    src={cat.photoUrls[0]} 
                    alt={cat.catName}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover'
                    }}
                  />
                )}
                <div style={{ padding: '15px' }}>
                  <h3>{cat.catName} - {cat.age} {cat.ageUnit} old</h3>
                  {cat.urgency === 'high' && (
                    <span style={{
                      display: 'inline-block',
                      padding: '4px 8px',
                      backgroundColor: '#DC143C',
                      color: 'white',
                      borderRadius: '4px',
                      fontSize: '12px',
                      marginBottom: '10px'
                    }}>
                      URGENT
                    </span>
                  )}
                  <p><strong>Description:</strong> {cat.description}</p>
                  <p><strong>Location:</strong> {cat.location}</p>
                  <p><strong>Duration:</strong> {cat.estimatedFosterDuration}</p>
                  <button
                    onClick={() => alert(`Contact: ${cat.contactPhone || cat.contactEmail}`)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginTop: '10px'
                    }}
                  >
                    I'm Interested
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // FOSTER APPLICATION FORM - COMPLETE VERSION
  if (view === 'applyForm') {
    return (
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '20px' }}>Foster Application</h1>
        <p style={{ marginBottom: '30px', color: '#666' }}>
          Please fill out this application completely. All information will be kept confidential.
        </p>
        
        <form onSubmit={handleFosterApplicationSubmit}>
          {/* Personal Information */}
          <section style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
            <h2 style={{ fontSize: '20px', marginBottom: '15px' }}>Personal Information</h2>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Full Name *</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Phone *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                  required
                />
              </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Address *</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '15px', marginBottom: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>City *</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>State *</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>ZIP *</label>
                <input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                  required
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Date of Birth *</label>
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
                required
              />
            </div>
          </section>

          {/* ID Verification */}
          <section style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#fff3cd', borderRadius: '8px' }}>
            <h2 style={{ fontSize: '20px', marginBottom: '15px' }}>ID Verification</h2>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>ID Type *</label>
              <select
                value={formData.idType}
                onChange={(e) => setFormData({ ...formData, idType: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
                required
              >
                <option value="drivers_license">Driver's License</option>
                <option value="state_id">State ID</option>
                <option value="passport">Passport</option>
              </select>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>ID Number *</label>
              <input
                type="text"
                value={formData.idNumber}
                onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                placeholder="Enter your ID number"
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Upload ID Photo (Front) *</label>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => handleFileChange(e, 'idFile')}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
                required
              />
              <small style={{ color: '#666' }}>Max file size: 5MB</small>
            </div>
          </section>

          {/* Housing Information */}
          <section style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
            <h2 style={{ fontSize: '20px', marginBottom: '15px' }}>Housing Information</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Housing Type *</label>
                <select
                  value={formData.housingType}
                  onChange={(e) => setFormData({ ...formData, housingType: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                  required
                >
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="condo">Condo</option>
                  <option value="townhouse">Townhouse</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Do you own or rent? *</label>
                <select
                  value={formData.ownOrRent}
                  onChange={(e) => setFormData({ ...formData, ownOrRent: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                  required
                >
                  <option value="own">Own</option>
                  <option value="rent">Rent</option>
                </select>
              </div>
            </div>

            {formData.ownOrRent === 'rent' && (
              <>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formData.landlordApproval}
                      onChange={(e) => setFormData({ ...formData, landlordApproval: e.target.checked })}
                      style={{ marginRight: '8px', width: '18px', height: '18px' }}
                    />
                    <span>I have my landlord's approval to foster pets *</span>
                  </label>
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    Landlord Contact (Name & Phone)
                  </label>
                  <input
                    type="text"
                    value={formData.landlordContact}
                    onChange={(e) => setFormData({ ...formData, landlordContact: e.target.value })}
                    placeholder="John Doe - (555) 123-4567"
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ccc',
                      borderRadius: '4px'
                    }}
                  />
                </div>
              </>
            )}
          </section>

          {/* Experience & Household */}
          <section style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
            <h2 style={{ fontSize: '20px', marginBottom: '15px' }}>Experience & Household</h2>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.priorFosterExperience}
                  onChange={(e) => setFormData({ ...formData, priorFosterExperience: e.target.checked })}
                  style={{ marginRight: '8px', width: '18px', height: '18px' }}
                />
                <span>I have prior fostering experience</span>
              </label>
            </div>

            {formData.priorFosterExperience && (
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Please describe your fostering experience
                </label>
                <textarea
                  value={formData.priorFosterDetails}
                  onChange={(e) => setFormData({ ...formData, priorFosterDetails: e.target.value })}
                  rows="3"
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                />
              </div>
            )}

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.hasPets}
                  onChange={(e) => setFormData({ ...formData, hasPets: e.target.checked })}
                  style={{ marginRight: '8px', width: '18px', height: '18px' }}
                />
                <span>I currently have pets</span>
              </label>
            </div>

            {formData.hasPets && (
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Please describe your current pets
                </label>
                <textarea
                  value={formData.currentPetsDetails}
                  onChange={(e) => setFormData({ ...formData, currentPetsDetails: e.target.value })}
                  rows="3"
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                />
              </div>
            )}

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.hasChildren}
                  onChange={(e) => setFormData({ ...formData, hasChildren: e.target.checked })}
                  style={{ marginRight: '8px', width: '18px', height: '18px' }}
                />
                <span>I have children in my household</span>
              </label>
            </div>

            {formData.hasChildren && (
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Children's ages
                </label>
                <input
                  type="text"
                  value={formData.childrenAges}
                  onChange={(e) => setFormData({ ...formData, childrenAges: e.target.value })}
                  placeholder="e.g., 5, 8, 12"
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                />
              </div>
            )}
          </section>

          {/* Fostering Preferences */}
          <section style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#e8f5e9', borderRadius: '8px' }}>
            <h2 style={{ fontSize: '20px', marginBottom: '15px' }}>Fostering Preferences</h2>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Maximum number of cats you're willing to foster at once *
              </label>
              <select
                value={formData.maxCatsWilling}
                onChange={(e) => setFormData({ ...formData, maxCatsWilling: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
                required
              >
                <option value="1">1 cat</option>
                <option value="2">2 cats</option>
                <option value="3">3 cats</option>
                <option value="4+">4 or more cats</option>
              </select>
            </div>

            <div style={{ marginBottom: '10px' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>
                I am willing to foster:
              </label>
              <label style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.canFosterKittens}
                  onChange={(e) => setFormData({ ...formData, canFosterKittens: e.target.checked })}
                  style={{ marginRight: '8px', width: '18px', height: '18px' }}
                />
                <span>Kittens (0-6 months)</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.canFosterAdult}
                  onChange={(e) => setFormData({ ...formData, canFosterAdult: e.target.checked })}
                  style={{ marginRight: '8px', width: '18px', height: '18px' }}
                />
                <span>Adult cats (6+ months)</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.canFosterSpecialNeeds}
                  onChange={(e) => setFormData({ ...formData, canFosterSpecialNeeds: e.target.checked })}
                  style={{ marginRight: '8px', width: '18px', height: '18px' }}
                />
                <span>Special needs cats</span>
              </label>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Available Start Date *
                </label>
                <input
                  type="date"
                  value={formData.availableStartDate}
                  onChange={(e) => setFormData({ ...formData, availableStartDate: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Maximum Foster Duration *
                </label>
                <select
                  value={formData.maxFosterDuration}
                  onChange={(e) => setFormData({ ...formData, maxFosterDuration: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                  required
                >
                  <option value="2-4 weeks">2-4 weeks</option>
                  <option value="1-3 months">1-3 months</option>
                  <option value="3-6 months">3-6 months</option>
                  <option value="6+ months">6+ months</option>
                </select>
              </div>
            </div>
          </section>

          {/* References */}
          <section style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
            <h2 style={{ fontSize: '20px', marginBottom: '15px' }}>References</h2>
            <p style={{ marginBottom: '15px', color: '#666' }}>
              Please provide at least one personal reference (not family member)
            </p>
            
            <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>Reference 1 *</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Name *</label>
                <input
                  type="text"
                  value={formData.reference1Name}
                  onChange={(e) => setFormData({ ...formData, reference1Name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Phone *</label>
                <input
                  type="tel"
                  value={formData.reference1Phone}
                  onChange={(e) => setFormData({ ...formData, reference1Phone: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Relationship *</label>
                <input
                  type="text"
                  value={formData.reference1Relationship}
                  onChange={(e) => setFormData({ ...formData, reference1Relationship: e.target.value })}
                  placeholder="Friend, Coworker"
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                  required
                />
              </div>
            </div>

            <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>Reference 2 (Optional)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Name</label>
                <input
                  type="text"
                  value={formData.reference2Name}
                  onChange={(e) => setFormData({ ...formData, reference2Name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Phone</label>
                <input
                  type="tel"
                  value={formData.reference2Phone}
                  onChange={(e) => setFormData({ ...formData, reference2Phone: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Relationship</label>
                <input
                  type="text"
                  value={formData.reference2Relationship}
                  onChange={(e) => setFormData({ ...formData, reference2Relationship: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                />
              </div>
            </div>
          </section>

          {/* Additional Information */}
          <section style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
            <h2 style={{ fontSize: '20px', marginBottom: '15px' }}>Additional Information</h2>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Upload Resume/CV (Optional)
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileChange(e, 'resumeFile')}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              />
              <small style={{ color: '#666' }}>Helpful for demonstrating responsibility</small>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Veterinarian Name (if applicable)
                </label>
                <input
                  type="text"
                  value={formData.veterinarianName}
                  onChange={(e) => setFormData({ ...formData, veterinarianName: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Veterinarian Phone
                </label>
                <input
                  type="tel"
                  value={formData.veterinarianPhone}
                  onChange={(e) => setFormData({ ...formData, veterinarianPhone: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Additional Information
              </label>
              <textarea
                value={formData.additionalInfo}
                onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                placeholder="Anything else you'd like us to know..."
                rows="4"
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              />
            </div>
          </section>

          {/* Agreement */}
          <section style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#fff3cd', borderRadius: '8px' }}>
            <h2 style={{ fontSize: '20px', marginBottom: '15px' }}>Agreement</h2>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.agreeToHomeVisit}
                  onChange={(e) => setFormData({ ...formData, agreeToHomeVisit: e.target.checked })}
                  style={{ marginRight: '8px', marginTop: '3px', width: '18px', height: '18px' }}
                  required
                />
                <span>
                  I agree to a home visit by MISHI staff to ensure a safe fostering environment *
                </span>
              </label>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                  style={{ marginRight: '8px', marginTop: '3px', width: '18px', height: '18px' }}
                  required
                />
                <span>
                  I understand that all information provided is truthful and accurate. I agree to MISHI's fostering terms *
                </span>
              </label>
            </div>
          </section>

          {/* Submit Buttons */}
          <div style={{ display: 'flex', gap: '15px' }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 1,
                padding: '15px',
                backgroundColor: loading ? '#ccc' : '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
            <button
              type="button"
              onClick={() => setView('main')}
              disabled={loading}
              style={{
                flex: 1,
                padding: '15px',
                backgroundColor: '#757575',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  // POST CAT FORM
  if (view === 'postCat') {
    return (
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '20px' }}>Post a Cat Needing Foster</h1>
        
        <form onSubmit={handlePostCatSubmit}>
          <section style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
            <h2 style={{ fontSize: '20px', marginBottom: '15px' }}>Cat Information</h2>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Cat's Name *</label>
              <input
                type="text"
                value={catPostData.catName}
                onChange={(e) => setCatPostData({ ...catPostData, catName: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Age *</label>
                <input
                  type="number"
                  value={catPostData.age}
                  onChange={(e) => setCatPostData({ ...catPostData, age: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Unit *</label>
                <select
                  value={catPostData.ageUnit}
                  onChange={(e) => setCatPostData({ ...catPostData, ageUnit: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                >
                  <option value="weeks">Weeks</option>
                  <option value="months">Months</option>
                  <option value="years">Years</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Gender</label>
                <select
                  value={catPostData.gender}
                  onChange={(e) => setCatPostData({ ...catPostData, gender: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="unknown">Unknown</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Description *</label>
              <textarea
                value={catPostData.description}
                onChange={(e) => setCatPostData({ ...catPostData, description: e.target.value })}
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
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Photos * (1-5)</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleCatPhotosChange}
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
                Why does this cat need fostering? *
              </label>
              <textarea
                value={catPostData.reasonNeedingFoster}
                onChange={(e) => setCatPostData({ ...catPostData, reasonNeedingFoster: e.target.value })}
                rows="3"
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Duration *</label>
                <select
                  value={catPostData.estimatedFosterDuration}
                  onChange={(e) => setCatPostData({ ...catPostData, estimatedFosterDuration: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                  required
                >
                  <option value="1-2 weeks">1-2 weeks</option>
                  <option value="2-4 weeks">2-4 weeks</option>
                  <option value="1-3 months">1-3 months</option>
                  <option value="3-6 months">3-6 months</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Urgency *</label>
                <select
                  value={catPostData.urgency}
                  onChange={(e) => setCatPostData({ ...catPostData, urgency: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                  required
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High - Urgent</option>
                </select>
              </div>
            </div>
          </section>

          <div style={{ display: 'flex', gap: '15px' }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 1,
                padding: '15px',
                backgroundColor: loading ? '#ccc' : '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Posting...' : 'Post Cat'}
            </button>
            <button
              type="button"
              onClick={() => setView('main')}
              disabled={loading}
              style={{
                flex: 1,
                padding: '15px',
                backgroundColor: '#757575',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
};

export default Fostering;