"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const UserProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const authToken = Cookies.get('accessToken');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:4000/profile/user', {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div>
      <h2>User Profile</h2>
      {profileData && (
        <div>
          <p>Username: {profileData.username}</p>
          <p>Role: {profileData.role}</p>
          <p>Balance: {profileData.balance}</p>
        </div>
      )}
    </div>
  );
};

