"use client"
import React, {useState} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';



const RoleToggle = () => {
    const [roleChanged, setRoleChanged] = useState(false);

    const authToken = Cookies.get('accessToken');

  const handleChange = async () => {
    try {
      await axios.post('http://localhost:4000/dashboard/changerole', null, {
        headers: {
            
          Authorization: `Bearer ${authToken}`
        }
      });
      setRoleChanged(true);
      window.location.reload();
      console.log('Role changed successfully');
      
    } catch (error) {
      console.error('Error changing role:', error);
    }
  };

  return (
    <div className="role-toggle">
      <button onClick={handleChange}>Change Role</button>
      {roleChanged && <div>Role changed successfully</div>}
    </div>
  );
};

export default RoleToggle;
