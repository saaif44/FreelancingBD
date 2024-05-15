"use client"
import React, { useState } from 'react';
import axios from 'axios';


import Link from 'next/link';

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


const SignupForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        language_known: '',
        nationality: '',
        address: '',
        phone_number: '',
        nid_number: '',
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        // Check if any field is empty
        for (const key in formData) {
            if (formData[key] === '') {
                setErrorMessage('Please provide all your information.');
                return; // Exit function early if any field is empty
            }
        }


        try {
            const response = await axios.post('http://localhost:4000/auth/signup', {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                role: 'CLIENT',
                balance: 1000,
                language_known: formData.language_known,
                nationality: formData.nationality,
                address: formData.address,
                phone_number: formData.phone_number,
                nid_number: formData.nid_number,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Signup successful:', response.data);
            setSuccessMessage('Signup successful!');
            setErrorMessage('');
        } catch (error) {
            console.error('Error signing up:', error);
            setSuccessMessage('');
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
                setErrorMessage('Failed to sign up. Please try again later.');
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
            <div style={{ backgroundColor: '#f0f0f0' ,padding: '20px', borderRadius: '5px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', color: '#000' }}>
                <h2 style={{ textAlign: 'center' }}>Signup</h2>
                {successMessage && <div style={{ color: 'green', marginBottom: '10px' }}>{successMessage}</div>}
                {errorMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', color: '#000' }}
                        />
                    </div>
                    <div>
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
                        style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' , color: '#000' }}
                    />
                </div>
                <div>
                    <label htmlFor="language_known">Languages Known</label>
                    <input
                        type="text"
                        id="language_known"
                        name="language_known"
                        value={formData.language_known}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' , color: '#000'}}
                    />
                </div>
                <div>
                    <label htmlFor="nationality">Nationality</label>
                    <input
                        type="text"
                        id="nationality"
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleChange}
                            style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', color: '#000' }}
                    />
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                            style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', color: '#000' }}
                    />
                </div>
                <div>
                    <label htmlFor="phone_number">Phone Number</label>
                    <input
                        type="text"
                        id="phone_number"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', color: '#000' }}

                    />
                </div>
                <div>
                    <label htmlFor="nid_number">NID Number</label>
                    <input
                        type="text"
                        id="nid_number"
                        name="nid_number"
                        value={formData.nid_number}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', color: '#000' }}

                    />
                </div>
                    <div style={{ textAlign: 'center' }}>
                        <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', margin: '20px' ,  borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Sign Up</button>
                    </div>
                </form>
            </div>
            </div>
        </div>
    );
};

export default SignupForm;
