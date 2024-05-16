// Navbar.js
import React from 'react';
import ProfileDropdown from './ProfileDropdown';

const Navbar = ({ profileData }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <RoleToggle />
        {profileData && <p style={{ marginLeft: '10px', color: 'lightgray', fontFamily: "arial", fontSize: '11' }}>{profileData.role}</p>}
      </div>
      <div className="navbar-right">
        <ProfileDropdown profileData={profileData} />
      </div>
    </nav>
  );
};

return(

    <ProfileDropdown/>

);

export default Navbar;
