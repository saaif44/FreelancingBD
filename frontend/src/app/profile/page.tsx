"use client";
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const Profile = () => {
  const [userData, setUserData] = useState({});
  const authToken = Cookies.get('accessToken');
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('personalInfo');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:4000/profile/user', {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [authToken]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-[#275DAD] p-4">
        <h2 className="text-lg font-semibold mb-4">User Profile</h2>
        <hr />
        {userData && (
          <ul>
            <li>
              <strong>Name:</strong> {userData.username}
            </li>
            <li>
              <strong>Email:</strong> {userData.email}
            </li>
            <li>
              <strong>Address:</strong> {userData.address}
            </li>
            <li>
              <strong>Phone No:</strong> {userData.phone_number}
            </li>
            <li>
              <strong>Nationality:</strong> {userData.nationality}
            </li>
            <li>
              <strong>Role:</strong> {userData.role}
            </li>
          </ul>
        )}
      </div>
      <div className="flex-1 p-4">
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'personalInfo' ? 'active' : ''}`}
            onClick={() => handleTabChange('personalInfo')}
          >
            Change Personal Information
          </button>
          <button
            className={`tab ${activeTab === 'changePassword' ? 'active' : ''}`}
            onClick={() => handleTabChange('changePassword')}
          >
            Change Password
          </button>
        </div>
        <div className="tab-content">
          {activeTab === 'personalInfo' && <PersonalInfoForm userData={userData} authToken={authToken} />}
          {activeTab === 'changePassword' && <ChangePasswordForm authToken={authToken} />}
        </div>
        <div>{message}</div>
      </div>
    </div>
  );
};

const PersonalInfoForm = ({ userData, authToken }) => {
  const [formData, setFormData] = useState({
    name: userData.username || '',
    email: userData.email || '',
    address: userData.address || '',
    phone_number: userData.phone_number || '',
    nationality: userData.nationality || '',
    language_known: userData.language_known || '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Verify password
      const response = await axios.post(
        'http://localhost:4000/auth/verify-password',
        { password: formData.password },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 201) {
        // Password is correct, proceed with updating profile
        if(response.data.valid === true) {
          // Prepare update data
          const updateData: { [key: string]: any } = { ...formData }; // Index signature added here
          Object.keys(updateData).forEach(key => {
            if (!updateData[key]) {
              updateData[key] = userData[key];
            }
          });

          // Remove password field from update data
          delete updateData.password;

          // Send update request
          const updateResponse = await axios.put('http://localhost:4000/profile/edit', updateData, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authToken}`,
            },
          });

          // Handle update response
          if (updateResponse.status === 200) {
            setMessage('Profile updated successfully');
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            setMessage('Failed to update profile');
          }
        } else {
          setMessage('Incorrect password');
        }
      }
      
    } catch (error) {
      setMessage('Error updating profile: ' + error.message);
    }
  };




  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-lg font-semibold mb-4">Update Personal Information</h2>
      <ul>
        <li className="mb-2">
          <input
            onChange={handleChange}
            type="text"
            name="name"
            placeholder="Update name"
            value={formData.name}
            className="py-2 rounded w-1/2"
          />
        </li>
        <li className="mb-2">
          <input
            onChange={handleChange}
            type="text"
            name="email"
            placeholder="Update email"
            value={formData.email}
            className="py-2 rounded w-1/2"
          />
        </li>
        <li className="mb-2">
          <input
            onChange={handleChange}
            type="text"
            name="address"
            placeholder="Update address"
            value={formData.address}
            className="py-2 rounded w-1/2"
          />
        </li>
        <li className="mb-2">
          <input
            onChange={handleChange}
            type="text"
            name="phone_number"
            placeholder="Update phone number"
            value={formData.phone_number}
            className="py-2 rounded w-1/2"
          />
        </li>
        <li className="mb-2">
          <input
            onChange={handleChange}
            type="text"
            name="nationality"
            placeholder="Update nationality"
            value={formData.nationality}
            className="py-2 rounded w-1/2"
          />
        </li>
        <li className="mb-2">
          <input
            onChange={handleChange}
            type="text"
            name="language_known"
            placeholder="Update language known"
            value={formData.language_known}
            className="py-2 rounded w-1/2"
          />
        </li>
        <li className="mb-2">
          <input
            onChange={handleChange}
            type="text"
            name="password"
            placeholder="Enter current password to update"
            value={formData.password}
            className="py-2 rounded w-1/2"
          />
        </li>
      </ul>
      <button className="bg-red-700 rounded text-white py-2 px-2 hover:bg-red-500" type="submit">
        Update
      </button>
      <div>{message}</div>
    </form>
  );
};

const ChangePasswordForm = ({ authToken }) => {
  const [formData, setFormData] = useState({
    oldpassword: '',
    newpassword: '',
    confirmpassword: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newpassword !== formData.confirmpassword) {
      setMessage('Passwords do not match');
      return;
    }
    try {
      const response = await axios.put('http://localhost:4000/profile/change-password', formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.status === 200) {
        setMessage('Password updated successfully');
      } else {
        setMessage('Failed to update password');
      }
    } catch (error) {
      setMessage('Error updating password: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-lg font-semibold mb-4">Change Password</h2>
      <ul>
        <li className="mb-2">
          <input
            onChange={handleChange}
            type="password"
            name="oldpassword"
            placeholder="Old Password"
            value={formData.oldpassword}
            className="py-2 rounded w-1/2"
          />
        </li>
        <li className="mb-2">
          <input
            onChange={handleChange}
            type="password"
            name="newpassword"
            placeholder="New Password"
            value={formData.newpassword}
            className="py-2 rounded w-1/2"
          />
        </li>
        <li className="mb-2">
          <input
            onChange={handleChange}
            type="password"
            name="confirmpassword"
            placeholder="Confirm Password"
            value={formData.confirmpassword}
            className="py-2 rounded w-1/2"
          />
        </li>
      </ul>
      <button className="bg-red-700 rounded text-white py-2 px-2 hover:bg-red-500" type="submit">
        Change Password
      </button>
      <div>{message}</div>
    </form>
  );
};

export default Profile;
