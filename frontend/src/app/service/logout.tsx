// LogoutButton.js
import React from 'react';
import Cookies from 'js-cookie';

const LogoutButton = () => {
  const handleLogout = () => {
    Cookies.remove('accessToken');
    window.location.href = '/signin';
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
