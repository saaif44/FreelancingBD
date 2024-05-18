"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RoleToggle from '../RoleToggle/page';
import Cookies from 'js-cookie';


const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const [logouts, setLogouts] = useState(false);
  const [isNotValidUser, setNotValidUser] = useState(false);
  const authToken = Cookies.get('accessToken');
  const [isOpen, setIsOpen] = useState(false);
  const [showJobForm, setShowJobForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [showBidForm, setShowBidForm] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [bids, setBids] = useState([]);

  
  
  if (logouts) {
    Cookies.remove('accessToken');
    window.location.href = '/signin';
  }

  const handleLogout = () => setLogouts(true);


  const profileOptions = [
    { label: 'Profile', onClick: () => window.location.href = '/profile' },
    { label: 'Messages', onClick: () => window.location.href = '/message' },
    { label: 'Balance', onClick: () => {} },
    { label: 'Logout', onClick: handleLogout },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!authToken) {
      setNotValidUser(true);
      setTimeout(() => setLogouts(true), 3000);
    }
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:4000/dashboard/', {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setProjects(response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, [authToken]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:4000/services/', {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setServices(response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchServices();
  }, [authToken]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:4000/profile/user', {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    fetchUserProfile();
  }, [authToken]);

  useEffect(() => {
    const fetchUserBids = async () => {
      try {
        const response = await axios.get('http://localhost:4000/bids/', {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setBids(response.data);
      } catch (error) {
        console.error('Error fetching user bids:', error);
      }
    };
    fetchUserBids();
  }, [authToken]);



  const handleBidButtonClick = (projectId) => {
    setSelectedProjectId(projectId);
    setShowBidForm(true);
  };

  const handleFormSubmit = async (endpoint, data) => {
    try {
      await axios.post(`http://localhost:4000/${endpoint}`, data, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      alert(`${endpoint.includes('createjob') ? 'Job' : endpoint.includes('createservice') ? 'Service' : 'Bid'} created successfully!`);
      setShowJobForm(false);
      setShowServiceForm(false);
      setShowBidForm(false);
      window.location.reload();  // Reload to update the displayed data
    } catch (error) {
      console.error(`Error creating ${endpoint}:`, error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert(`An error occurred while creating the ${endpoint.includes('createjob') ? 'job' : endpoint.includes('createservice') ? 'service' : 'bid'}.`);
      }
    }
  };

  return (
    <div className="Role-container">
      <nav className="navbar">
        <div className="navbar-left">
          <RoleToggle />
          {profileData && (
            <p style={{ marginLeft: '10px', color: 'lightgray', fontFamily: 'arial', fontSize: '11px' }}>
              {profileData.role}
            </p>
          )}
        </div>
        <div className="navbar-right">
          <div className="dropdown">
            <button className="dropdown-toggle" onClick={toggleDropdown}>
              {profileData?.username || 'Menu'}
            </button>
            {isOpen && (
              <div className="dropdown-menu">
                <ul>
                  {profileOptions.map((option, index) => (
                    <li key={index} onClick={option.onClick}>
                      {option.label === 'Balance' ? `Balance $${profileData?.balance}` : option.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>

      {isNotValidUser && (
        <h1 className="login-warning">
          You are not logged in. Please log in to access your dashboard.
        </h1>
      )}

      <div className="dashboard-container">
        <h2>Dashboard</h2>
        <div className="action-buttons">
          {profileData?.role === 'FREELANCER' ? (
            <button className="create-button" onClick={() => setShowServiceForm(true)}>
              Create Service
            </button>
          ) : (
            <button className="create-button" onClick={() => setShowJobForm(true)}>
              Create Job
            </button>
          )}
        </div>
        
        {profileData?.role === 'CLIENT' ? (
          <div className="service-list">
            {services.map((service) => (
              <div className="service-card" key={service.id}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <p className="offer">Standard Offer: ${service.standard_offer}</p>
                <p className="offer">Budget Offer: ${service.budget_offer}</p>
                <p className="offer">Premium Offer: ${service.premium_offer}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="project-list">
            {projects.map((project) => (
              <div className="project-card" key={project.id}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                {profileData?.role === 'FREELANCER' && (
                  <>
                    <p className="budget">Budget: ${project.budget}</p>
                    <p className="deadline">Deadline: {new Date(project.deadline).toDateString()}</p>
                    <p className={`status ${project.is_job_completed ? 'completed' : 'pending'}`}>
                      {project.is_job_completed ? 'Completed' : 'Pending'}
                    </p>
                    <p className={`status ${project.is_payment_verified ? 'verified' : 'pending'}`}>
                      {project.is_payment_verified ? 'Payment Verified' : 'Payment Pending'}
                    </p>
                    {!bids.find((bid) => bid.projectId === project.id) && (
                      <button onClick={() => handleBidButtonClick(project.id)} className="bid-button">
                        Bid
                      </button>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {showJobForm && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Create Job</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const data = new FormData(e.target);
                  handleFormSubmit('jobservice/createjob', {
                    title: data.get('title'),
                    description: data.get('description'),
                    budget: parseFloat(data.get('budget')),
                    deadline: new Date(data.get('deadline')).toISOString(),
                  });
                }}
              >
                <input name="title" placeholder="Job Title" required />
                <textarea name="description" placeholder="Job Description" required />
                <input type="number" name="budget" placeholder="Budget" required />
                <input type="date" name="deadline" placeholder="Deadline" required />
                <button type="submit">Submit</button>
                <button type="button" onClick={() => setShowJobForm(false)}>Cancel</button>
              </form>
            </div>
          </div>
        )}

        {showServiceForm && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Create Service</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const data = new FormData(e.target);
                  handleFormSubmit('jobservice/createservice', {
                    title: data.get('title'),
                    description: data.get('description'),
                    standard_offer: parseFloat(data.get('standard_offer')),
                    budget_offer: parseFloat(data.get('budget_offer')),
                    premium_offer: parseFloat(data.get('premium_offer')),
                  });
                }}
              >
                <input name="title" placeholder="Service Title" required />
                <textarea name="description" placeholder="Service Description" required />
                <input type="number" name="standard_offer" placeholder="Standard Offer Price" required />
                <input type="number" name="budget_offer" placeholder="Budget Offer Price" required />
                <input type="number" name="premium_offer" placeholder="Premium Offer Price" required />
                <button type="submit">Submit</button>
                <button type="button" onClick={() => setShowServiceForm(false)}>Cancel</button>
              </form>
            </div>
          </div>
        )}

        {showBidForm && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Create Bid</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const data = new FormData(e.target);
                  handleFormSubmit('jobservice/createbid', {
                    description: data.get('description'),
                    offer_time: parseInt(data.get('offer_time')),
                    offer_rate: parseFloat(data.get('offer_rate')),
                    userId: profileData?.userId,
                    jobId: selectedProjectId,
                  });
                }}
              >
                <input name="description" placeholder="Bid Description" required />
                <input type="number" name="offer_time" placeholder="Offer Time (in hours)" required />
                <input type="number" name="offer_rate" placeholder="Offer Rate" required />
                <input type="hidden" name="userId" value={profileData?.userId} />
                <button type="submit">Submit</button>
                <button type="button" onClick={() => setShowBidForm(false)}>Cancel</button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;
