// @flow 
import React from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
export const Navbar = () => {
    const type = Cookies.get("type") || "";
    return (
        <div>
            <ul className = "flex justify-between m-10 item-center mb-1">
                <div>
                   <li> <Link href = '/'>Home</Link></li>
                </div>
                <div className='flex gap-2'>
                   <li> <Link href = { type==="Admin"? 'adminDashboard' : 'dashboard' } >Dashboard</Link></li>
                    <li><Link href = '/signup'>Sign up</Link></li>
                </div>
    
            </ul>
            <hr />
        </div>
    );
};