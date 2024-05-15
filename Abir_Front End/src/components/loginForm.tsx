import React, { ReactNode, useState } from 'react';

const LForm:React.FC  = () => {
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
 
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     setEmail(e.target.value);
   };
 
   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     setPassword(e.target.value);
   };
     return (
         <div>
             <input
                 type="email"
                 name="email"
                 id="email"
                 placeholder="Email"
                 className="w-full border border-grey-700 rounded px-3 py-2 mb-4 text-black"
                 required
                 value = {email}
                 onChange={handleEmailChange}
             />
             <input
                 type="password"
                 name="password"
                 id="password"
                 placeholder="Password"
                 value = {password}
                 className="w-full border border-grey-700 rounded px-3 py-2 mb-4 text-black"
                 required
                 onChange={handlePasswordChange}
             />            
             <button type="submit" className="bg-[#2d1d66] w-full rounded py-2 hover:bg-[#111242] mb-4">
                 Login
             </button>
         </div>
     );
};

export default LForm;
