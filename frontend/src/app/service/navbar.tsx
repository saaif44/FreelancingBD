// Navbar.js
import React, { useState } from 'react';
import ProfileDropdown from './dropdown';

const Navbar = ({ profileData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-right">
      <ProfileDropdown/>
      </div>
    </nav>
  );
};

export default Navbar;
