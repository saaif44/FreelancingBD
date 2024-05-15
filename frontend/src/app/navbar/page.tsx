import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navbarList}>
        <li style={styles.navbarItem}>
          <Link to="/" style={styles.navbarLink}>Home</Link>
        </li>
        <li style={styles.navbarItem}>
          <Link to="/about" style={styles.navbarLink}>About</Link>
        </li>
        <li style={styles.navbarItem}>
          <Link to="/contact" style={styles.navbarLink}>Contact</Link>
        </li>
        {/* Add more links as needed */}
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#333',
    padding: '10px 0',
  },
  navbarList: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
  },
  navbarItem: {
    margin: '0 10px',
  },
  navbarLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '18px',
  },
};

export default Navbar;
