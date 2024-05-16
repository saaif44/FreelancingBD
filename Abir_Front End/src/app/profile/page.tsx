"use client"
import {  useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Profile = () => {
    const router = useRouter();
    
    const id = 1;
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        type: 'Admin'
    });

    
    const [message, setMessage] = useState("");

    const handleChange = (e:any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const fetchData = async (e:any)=>{
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/user/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                console.log('User created successfully');
                setMessage("User created successfully");
                //router.push("/login");
                // Optionally, you can redirect the user or show a success message here
            } else {
                console.error('Failed to create user');
                setMessage("Failed to create user");
                // Handle error appropriately
            }
        } catch (error) {
            console.error('Error creating user:', error);
            setMessage('Error creating user:'+ error);
            // Handle error appropriately
        }
    };
    
    

    const userProfileData = [
        { label: 'Name', value: "user.name" },
        { label: 'Email', value: "user.email "},
        { label: 'Password', value: "user.address" },
        { label: 'Type', value: "user.contact" },
    ];
    
    return (
        <div className="flex h-screen ">
            <div className="w-1/4 bg-[#275DAD] p-4">
                <h2 className="text-lg font-semibold mb-4">User Profile</h2>
                <hr />
                <ul>
                    <li><strong>Name:</strong> {"cookie"}</li>
                    <li><strong>Email:</strong> {"cookie-"}</li>
                    <li><strong>Password:</strong> {"cookie-"}</li>
                    <li><strong>Type:</strong> {"cookie-"}</li>
                </ul>
            </div>
            <div className="flex-1 p-4">
                <h2 className="text-lg font-semibold mb-4">Update Profile</h2>
                <div className="profile-info mb-4">
                    <form onSubmit={fetchData}>
                        <ul className=''>
                            
                               
                        <li className='mb-2 text-black'> <input  onChange={handleChange} type="text"  name = "name" placeholder={"update name" }   className='py-2 rounded w-1/2'/> </li>
                        <li className='mb-2 text-black'> <input  onChange={handleChange} type="email"  name = "email" placeholder={"update email"  }  className='py-2 rounded w-1/2'/> </li>
                        <li className='mb-2 text-black'> <input  onChange={handleChange} type="text"  name = "password" placeholder={"update password"  }  className='py-2 rounded w-1/2'/> </li>
                            
                            
                        </ul>
                        <button className='bg-red-700 rounded text-white py-2 px-2 hover:bg-red-500' type="submit">Update</button>
                    </form>
                    <div>{message}</div>
                </div>
                
            </div>
        </div>
    );
};

export default Profile;