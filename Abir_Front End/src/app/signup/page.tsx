"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import {  useRouter } from 'next/navigation';


const SignUp = () => {
   
   const router = useRouter();
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
   const handleSubmit = async (e:any) => {
       e.preventDefault();
       try {
           const response = await fetch('http://localhost:3000/auth/signup', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify(formData)
           });
           if (response.ok) {
               console.log('User created successfully');
               setMessage("User created successfully");
               router.push("/login");
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
   return (
        <div className='flex min-h-screen flex-col items-center justify-between mt-10'>
         <div className='bg-[#212121] p-8 rounded shadow w-96'>
         <h1 className='text-2xl text-center font-semibold mb-8'>Sign Up</h1>
         <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full border border-grey-700 rounded px-3 py-2 mb-4 text-black"
                required
                onChange={handleChange}
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full border border-grey-700 rounded px-3 py-2 mb-4 text-black"
                required
                onChange={handleChange}
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full border border-grey-700 rounded px-3 py-2 mb-4 text-black"
                required
                onChange={handleChange}
            />
            <label htmlFor="type" className="block text-white mb-2">Type:</label>
            <select
                name="type"
                id="type"
                className='rounded text-center mb-4 w-full border border-grey-700 py-2 px-3 focus:outline-none text-white bg-gray-500'
                onChange={handleChange}
            >
                <option value="Admin">Admin</option>
                <option value="Freelancer">Freelancer</option>
                <option value="Buyer">Buyer</option>
            </select>
            <button type="submit" className="bg-[#2d1d66] w-full rounded py-2 hover:bg-[#111242] mb-4">
                Submit
            </button>
            </form>
            <div className="text-center text-gray-500">-OR-</div>
            <Link href="/login" className="font-semibold text-blue-200 hover:text-red-500 ml-10">Login with an existing account</Link>
            <div className=' text-red-500 ml-10'>{message}</div>
            </div>
        
        </div>

   );
};


export default SignUp;

function userRouter() {
    throw new Error('Function not implemented.');
}
