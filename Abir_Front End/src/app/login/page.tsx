"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import {  useRouter } from 'next/navigation';
import Cookies from "js-cookie";

const Login = () => {
   
   const router = useRouter();
   const [message, setMessage] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
   
   const handleSubmit = async (e:any) => {
       e.preventDefault();
       try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            });
            
            console.log(email + " " + password)
            if (response.ok) {
                
                const data = await response.json();

                const expirationDate = new Date();
                expirationDate.setTime(expirationDate.getTime() + 15 * 60 * 1000);
                Cookies.set("authToken", data.tocken, { expires: expirationDate });
                Cookies.set("type", data.user.type, { expires: expirationDate });
                Cookies.set("id", data.user.id, { expires: expirationDate });
                if(data.user.type==="Admin")router.push('/adminDashboard');
                else router.push("/dashboard");

                // Optionally, you can redirect the user or show a success message here
            } else {
                console.error('No Such User Found!');
                setMessage("No Such User Found!");
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
         <h1 className='text-2xl text-center font-semibold mb-8'>Log in</h1>
         <form onSubmit={handleSubmit}>
            
            <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full border border-grey-700 rounded px-3 py-2 mb-4 text-black"
                required
                onChange={handleEmailChange}
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full border border-grey-700 rounded px-3 py-2 mb-4 text-black"
                required
                onChange={handlePasswordChange}
            />
            
            <button type="submit" className="bg-[#2d1d66] w-full rounded py-2 hover:bg-[#111242] mb-4">
                Login
            </button>
            </form>
            <div className="text-center text-gray-500">-OR-</div>
            <Link href="/signup" className="font-semibold text-blue-200 hover:text-red-500 ml-10">Don't have an account? Sign up!</Link>
            <div className=' text-red-500 ml-10'>{message}</div>
            </div>
        
        </div>

   );
};


export default Login;

function userRouter() {
    throw new Error('Function not implemented.');
}
