"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RoleToggle from '../RoleToggle/page';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { profile } from 'console';
import { access } from 'fs';
import { Averia_Libre } from 'next/font/google';
import {Router, useRouter} from 'next/router';



const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const [logouts, setLogouts] = useState(false);
  const [isnotValidUser, setNotValidUser] = useState(false);
  const authToken = Cookies.get('accessToken');
  const [isOpen, setIsOpen] = useState(false);
 

const profileOptions = [
  {
    label: 'Profile',
    onClick: () => {
      console.log('Profile clicked');
      window.location.href = '/profile';
    },
  },
  {
    label: 'Messages',
    onClick: () => {
      console.log('Messages clicked');
      window.location.href = '/message';
    },
  },
  {
  label: 'Balance',
  onClick: () => {
      console.log('Balance clicked');
  },
},
  {
    label: 'Logout',
    onClick: () => {
      handleLogout();
    },
  },
  {
    label: 'Messages',
    onClick: () => {
      console.log('Messages clicked');
      window.location.href = '/admin/createUser';
    },
  },
  
];
  

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };



  useEffect(() => {
    //validation of dashboard
  if(!authToken){
    setNotValidUser(true);
    setTimeout(() => {
      setLogouts(true);
    }, 3000);
   
      }
  }, []);

  console.log(authToken);
  console.log('Bearer ${authToken}');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:4000/dashboard/', {
          headers: {
            Authorization: `Bearer ${authToken}`
            
          }
        });
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }



    };
    fetchProjects();
  }, []);

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

  if (logouts) {
    Cookies.remove('accessToken');
    window.location.href='/signin';
     }

 
  const handleLogout = async () => {
    try {
        setLogouts(true);
            } catch (error) {
      console.error('Error logging out:', error);
    }
  };



    


  return (

    
    
    <div className="Role-container">
        <nav className="navbar">
        <div className="navbar-left" >
          <RoleToggle />
          {profileData && ( <p style={{marginLeft: '10px', color:'lightgray', fontFamily:"arial",fontSize:'11' }}>{profileData.role}</p> )}
        </div>

        <div className="navbar-right">
<div className="dropdown">
  <button className="dropdown-toggle" onClick={toggleDropdown}>
    {profileData && profileData.username ? profileData.username : 'Menu'}
  </button>
  {isOpen && (
    <div className="dropdown-menu">
      <ul>
        {profileOptions.map((option, index) => (
          <li key={index} onClick={option.onClick}>
            {option.label === 'Balance' ? ( <span> Balance ${profileData && profileData.balance} </span> ) : option.label}
          </li>

        ))}
      </ul>
    </div>
  )}
</div>

        </div>
      </nav>
        
      
  
    {isnotValidUser && (<h1 style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '70%', maxWidth: '500px', backgroundColor: 'red', color: 'white', padding: '20px', borderRadius: '10px', textAlign: 'center', zIndex: '9999' }}>You are not logged in. Please log in to access your dashboard.</h1>)}
  

    <div className="dashboard-container">
        
      <h2>Dashboard</h2>
      <div>
        {projects.map(project => (
          <div className="project-card" key={project.id}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p className="budget">Budget: ${project.budget}</p>
            <p className="deadline">Deadline: {new Date(project.deadline).toLocaleDateString()}</p>
            <p className={`status ${project.is_job_completed ? 'completed' : 'pending'}`}>{project.is_job_completed ? 'Completed' : 'Pending'}</p>
            <p className={`status ${project.is_payment_verified ? 'verified' : 'pending'}`}>{project.is_payment_verified ? 'Payment Verified' : 'Payment Pending'}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
