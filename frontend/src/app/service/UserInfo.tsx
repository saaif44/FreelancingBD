"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const UserInfo = () => {
  const [userData, setUserData] = useState({ username: '', balance: '' });
  const authToken = Cookies.get('accessToken');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:4000/profile/user', {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        const { balance, username } = response.data;
        setUserData({ username, balance });
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [authToken]);

  return userData;
};

export default UserInfo;
