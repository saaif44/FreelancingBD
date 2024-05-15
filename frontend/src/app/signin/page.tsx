"use client"

import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';



const linkStyle = {
  marginRight: 15,
  color: 'white',
  textDecoration: 'none',
};

const navStyle = {
  backgroundColor: '#333',
  padding: '10px',
  marginBottom: '20px',
  display: 'flex',
  justifyContent: 'center',
};


const SigninForm = () => {

  const [signedin, setsignedIn] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (signedin) {
    // const navigate = useNavigate();
    const router = useRouter();
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/auth/signin', formData);
      const { accessToken } = response.data;
      Cookies.set('accessToken', accessToken, { expires: 1 }); 
      setSuccessMessage('Signin successful!');
      setErrorMessage('');
      setsignedIn(true);
         
    } catch (error) {
      console.error('Error signing in:', error);
      setSuccessMessage('');
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
        setErrorMessage('Failed to sign in. Please try again later.');
      } else if (error.request) {
        console.error('No response received:', error.request);
        setErrorMessage('No response received from the server. Please check your network connection.');
      } else {
        console.error('Error setting up the request:', error.message);
        setErrorMessage('Error setting up the request. Please try again later.');
      }
    }
  };

  return (

    <div>

    <nav style={navStyle}>
    <Link href="/" style={linkStyle}>Home</Link>
    <Link href="/signup" style={linkStyle}>Signup</Link>
    <Link href="/signin" style={linkStyle}>Signin</Link>
  </nav>

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '5px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', color: '#000' }}>
        <h2 style={{ textAlign: 'center' }}>Signin</h2>
        {successMessage && <div style={{ color: 'green', marginBottom: '10px' }}>{successMessage}</div>}
        {errorMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', color: '#000' }}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', color: '#000' }}
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', margin: '20px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Sign In</button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default SigninForm;
