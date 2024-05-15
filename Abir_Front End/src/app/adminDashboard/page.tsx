import React from 'react';

const AdminDashboard = () => {
    return (
        <div>
            <div className = "bg-gray-500 items-center ml-96 rounded mt-10 mr-20" >
                <ul>
                    <div className = "flex gap-10 py-10 ml-10 mr-5 ">
                        <li className='bg-[#4f32b1] rounded w-80 h-20 px-10 py-20  text-center hover:bg-[#1f185f]'>Profile</li>
                        <li className='bg-[#c5ac3f] rounded w-80 h-20 px-10 py-20 text-center hover:bg-[#605515]'>Review-Rating</li>
                    </div>
                    <div className = "flex gap-10 py-10 ml-10 mr-5">
                        <li className='bg-[#52bc77] rounded w-80 h-20 px-10 py-20 text-center hover:bg-[#247d28]'>Access User</li>
                        <li className='bg-[#c36064] rounded w-80 h-20 px-10 py-20 text-center hover:bg-[#933235]'>Post</li>
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default AdminDashboard;