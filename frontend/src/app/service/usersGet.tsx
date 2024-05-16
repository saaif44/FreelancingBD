// UserInfo.js
"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';



const UserInfo = () => {
    const [userData, setUserData] = useState(null);
    const authToken = Cookies.get('accessToken');

    useEffect(() => {
        const fetchUserProfile = async () => {
          try {
            const response = await axios.get('http://localhost:4000/profile/user', {
              headers: {
                Authorization: `Bearer ${authToken}`
              }
            });
            setUserinfo(response.data);
          } catch (error) {
            console.error('Error fetching user profile:', error);
          }
        };
    
        fetchUserProfile();
      }, []);
      

    }

export { UserInfo, userData };