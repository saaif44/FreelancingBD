"use client"
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import RoleToggle from '../RoleToggle/page';
import { profile } from 'console';

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [userPassword, setUserPassword] = useState('');
  const [maskedPassword, setMaskedPassword] = useState('');
  const authToken = Cookies.get('accessToken');
  const [logouts, setLogouts] = useState(false);
  const [isnotValidUser, setNotValidUser] = useState(false);
  const[profileData, setProfileData] = useState(null);
    const [isOpen, setIsOpen] = useState(false);



  const profileOptions = [

    {
        label: 'Dashboard',
        onClick: () => {
            console.log('dashboard clicked');
            window.location.href = '/dashboard';
        },
      },
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
        window.location.href = '/transaction';
    },
  },
  
    {
      label: 'Logout',
      onClick: () => {
        handleLogout();
      },
    },
  ];
    
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  


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


  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:4000/profile/user', {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        setUserData(response.data);
        if (response.data && response.data.password) {
          setUserPassword(response.data.password);
          const masked = response.data.password.replace(/./g, '*');
          setMaskedPassword(masked);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    emaill: '',
    passwords: '',
    language_known: '',
    nationality: '',
    address: '',
    phone_number: '',
    balance: 0,
    oldpassword: '',
    newpasswords: '',
    confirmpasswords: '',
    id:'',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure authToken is not undefined
      if (!authToken) {
        console.error('Auth token is undefined');
        return;
      }
  
      // Validate email format
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (formData.email && !emailRegex.test(formData.email)) {
        setMessage('Invalid email format');
        return;
      }
  
      // Validate if new password and confirm password match
      if (formData.newpassword !== formData.confirmpassword) {
        setMessage('Passwords do not match');
        return;
      }
  
      // Ensure old password is provided for any update
      if (!formData.oldpassword) {
        setMessage('old password is required');
        return;
      }
  
      // Decode the auth token to inspect its contents
      const decodedToken = jwtDecode(authToken);
      console.log('Decoded token:', decodedToken);
  
      // Determine the appropriate claim for user ID and use that instead
      const userId = decodedToken.sub || decodedToken.userId; // Adjust this based on your token structure
  
      // Create a new object with non-null values from formData
      const updatedData = Object.fromEntries(
        Object.entries(formData).filter(([key, value]) => value !== null && value !== undefined)
      );
  
      const response = await axios.put(`http://localhost:4000/profile/edit`, updatedData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.status === 200) {
        console.log('Profile updated successfully');
        setMessage('Profile updated successfully');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        console.error('Failed to update profile');
        setMessage('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Error updating profile: ' + error.message);
    }
  };
  

  return (

    











    <div className="flex h-screen" >
        
        

        <div className="dropdown"  style={{ position: 'absolute', top: '10px', right: '800px' }}>
<button className="dropdown-toggle" onClick={toggleDropdown}>
{profileData && profileData.username ? profileData.username : 'Menu'}
</button>
{isOpen && (
<div className="dropdown-menu">
  <ul>
    {profileOptions.map((option, index) => (
      <li key={index} onClick={option.onClick}>
        {option.label === 'Balance' ? ( <span> Balance ${userData && userData.balance} </span> ) : option.label}
      </li>

    ))}
  </ul>
</div>
)}
</div>







      <div className="w-1/4 bg-[#275DAD] p-4">
        <h2 className="text-lg font-semibold mb-4">User Profile</h2>
        <hr />
        {userData && (
          <ul>
            <li>
              <strong>Name:</strong> {userData.username}
            </li>
            <li>
              <strong>Email:</strong> {userData.email}
            </li>
            <li>
              <strong>Address:</strong> {userData.address}
            </li>
            <li>
              <strong>phone No:</strong> {userData.phone_number}
            </li>
            <li>
              <strong>nationality:</strong> {userData.nationality}
            </li>
            <li>
              <strong>Your Password:</strong> {maskedPassword}
            </li>
            <li>
              <strong>Type:</strong> {userData.role}
            </li>
            <li>
              <strong>Type:</strong> {userData.id}
            </li>
          </ul>
        )}
      </div>
      <div className="flex-1 p-4">
        <h2 className="text-lg font-semibold mb-4">Update Profile</h2>
        <div className="profile-info mb-4">
          <form onSubmit={handleSubmit}>
            <ul className="">
              <li className="mb-2 text-black">
                <input
                  onChange={handleChange}
                  type="text"
                  name="name"
                  placeholder="Update name"
                  value={formData.name}
                  className="py-2 rounded w-1/2"
                />
              </li>
              <li className="mb-2 text-black">
                <input
                  onChange={handleChange}
                  type="email"
                  name="email"
                  placeholder="Update email"
                  value={formData.emaill}
                  className="py-2 rounded w-1/2"
                />
              </li>

              <li className="mb-2 text-black">
                <input
                  onChange={handleChange}
                  type="text"
                  name="address"
                  placeholder="Update address"
                  value={formData.address}
                  className="py-2 rounded w-1/2"
                />
              </li>

              <li className="mb-2 text-black">
                <input
                  onChange={handleChange}
                  type="text"
                  name="phone_number"
                  placeholder="Update phone number"
                  value={formData.phone_number}
                  className="py-2 rounded w-1/2"
                />
              </li>

              <li className="mb-2 text-black">
                <input
                  onChange={handleChange}
                  type="text"
                  name="nationality"
                  placeholder="Update nationality"
                  value={formData.nationality}
                  className="py-2 rounded w-1/2"
                />
              </li>

              <li className="mb-2 text-black">
                <input
                  onChange={handleChange}
                  type="text"
                  name="language_known"
                  placeholder="Update language known"
                  value={formData.language_known}
                  className="py-2 rounded w-1/2"
                />
              </li>

              <li className="mb-2 text-black">
                <input
                  onChange={handleChange}
                  type="password"
                  name="oldpassword"
                  placeholder="Old Password"
                  value={formData.oldpasswords}
                  className="py-2 rounded w-1/2"
                />
              </li>

              <li className="mb-2 text-black">
                <input
                  onChange={handleChange}
                  type="password"
                  name="newpassword"
                  placeholder="New Password"
                  value={formData.newpasswords}
                  className="py-2 rounded w-1/2"
                />
              </li>

              <li className="mb-2 text-black">
                <input
                  onChange={handleChange}
                  type="password"
                  name="confirmpassword"
                  placeholder="Confirm Password"
                  value={formData.confirmpasswords}
                  className="py-2 rounded w-1/2"
                />
              </li>
            </ul>
            <button className="bg-red-700 rounded text-white py-2 px-2 hover:bg-red-500" type="submit">
              Update
            </button>
          </form>

        

          <div>{message}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
