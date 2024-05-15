"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RoleToggle from '../RoleToggle/page';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { profile } from 'console';


const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const [logouts, setLogouts] = useState(false);
  const authToken = Cookies.get('accessToken');

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
    const router = useRouter();
    Cookies.remove('accessToken');
                router.push('./signin');
     }

 
  const handleLogout = async () => {
    try {
        setLogouts(true);
        window.location.reload();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };



    


  return (

    <div className="Role-container">
        <nav className="navbar">
        <div className="navbar-left">
          <RoleToggle />
          {profileData && ( <p>{profileData.role}</p> )}
        </div>
        <div className="navbar-middle">
          {profileData && (
            <div>
              <p>Username: {profileData.username}</p>
              <p>Balance: {profileData.balance}</p>
            </div>
          )}
        </div>
        <div className="navbar-right">
          <button  onClick={handleLogout}><link href="/home"/>Logout</button>
        </div>
      </nav>
        
      

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
