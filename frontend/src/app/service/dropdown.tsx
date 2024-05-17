
"use client"
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import UserInfo from './UserInfo';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { username, balance } = UserInfo();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleDashboardClick = () => {
    console.log('Dashboard');
    window.location.href = '/dashboard';
  };

  const handleProfileClick = () => {
    console.log('Profile clicked');
    window.location.href = '/profile';
  };

  const handleMessagesClick = () => {
    console.log('Messages clicked');
    window.location.href = '/message';
  };

  const handleLogout = () => {
    Cookies.remove('accessToken');
    window.location.href = '/signin';
  };

  const profileOptions = [
    { label: 'Dashboard', onClick: handleDashboardClick },
    { label: 'Profile', onClick: handleProfileClick },
    { label: 'Messages', onClick: handleMessagesClick },
    { label: 'Balance', onClick: () => console.log('Balance clicked') },
    { label: 'Logout', onClick: handleLogout }
  ];

  return (
    <div className="dropdown">
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        {/* {profileData && profileData.username ? profileData.username : 'Menu'} */}
        {username ? username : 'Menu'}
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <ul>
            {profileOptions.map((option, index) => (
              <li key={index} onClick={option.onClick}>
                {option.label === 'Balance' ? (
                  // <span> Balance ${profileData && profileData.balance} </span>
                  <span> Balance ${balance} </span>
                ) : (
                  option.label
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
