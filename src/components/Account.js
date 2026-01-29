import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Account = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [profilePictureURL, setProfilePictureURL] = useState("");
  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setUserData(userDoc.data());
          setFormData(userDoc.data());
          setProfilePictureURL(userDoc.data().profilePicture || "");
        } else {
          console.error("No user data found!");
        }
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, formData);
      setUserData(formData);
      setIsEditing(false);
      alert("Profile updated successfully!");
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const storageRef = ref(storage, `profile_pictures/${auth.currentUser.uid}`);

    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      // Update Firestore with the profile picture URL
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, { profilePicture: downloadURL });

      setProfilePictureURL(downloadURL);
      alert("Profile picture updated successfully!");
    } catch (error) {
      console.error("Error uploading file:", error.message);
      alert(error.message);
    }
  };

  return userData ? (
    <div>
      <h1>Account Details</h1>
      <div>
        {profilePictureURL ? (
          <img
            src={profilePictureURL}
            alt="Profile"
            style={{ width: "150px", height: "150px", borderRadius: "50%" }}
          />
        ) : (
          <p>No profile picture uploaded</p>
        )}
      </div>
      {isEditing ? (
        <div>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleInputChange}
            placeholder="Name"
          />
          <input
            type="date"
            name="dob"
            value={formData.dob || ""}
            onChange={handleInputChange}
            placeholder="Date of Birth"
          />
          <input
            type="text"
            name="address"
            value={formData.address || ""}
            onChange={handleInputChange}
            placeholder="Address"
          />
          <input
            type="number"
            name="age"
            value={formData.age || ""}
            onChange={handleInputChange}
            placeholder="Age"
          />
          <select
            name="sex"
            value={formData.sex || ""}
            onChange={handleInputChange}
          >
            <option value="">Select Sex</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <div>
            <label>Upload Profile Picture:</label>
            <input type="file" onChange={handleFileUpload} />
          </div>
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <p>DOB: {userData.dob}</p>
          <p>Address: {userData.address}</p>
          <p>Age: {userData.age}</p>
          <p>Sex: {userData.sex}</p>
          <p>Role: {userData.role}</p>

          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default Account;
