"use client";
import { useRouter, useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import LogoutButton from "@/components/logoutButton";
import Navbar from "@/components/Navbar";

// interface EditContactProps {
//   id: number;
// }

const EditUser = () => {
  const router = useRouter();
  //const { id } = router.query;
  const param = useParams();
  const uid = param.id;
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    type: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/user`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({user})
        });
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            console.error("Error fetching user data:", response.status);
          }
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/user/${uid}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      if (response.ok) {
        alert("USER updated successfully!");
        router.push("/accessUser");
      } else {
        alert("Updating failed");
      }
    } catch (error) {
      alert("Error updating USER");
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ textAlign: "right" }}>
        <LogoutButton />
      </div>
      <h1>Edit Contact</h1>
      <form onSubmit={handleUpdate}>
        <div>
        <input
          placeholder="Enter name"
          className="text-black mb-2 rounded w-1/4"
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          required
        />
        <br></br>
        </div>

        <div>
            <input
            placeholder="Enter email"
            className="text-black mb-2 rounded w-1/4"
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
            />
        <br></br>
        </div>

        <div>
        <input
          placeholder="Enter password"
          className="text-black mb-2 rounded w-1/4"
          type="text"
          name="password"
          value={user.password}
          onChange={handleChange}
          required
        />
        
        </div>

        <div>
            <label htmlFor="type">Type:</label> <br />
            <select
            className="text-black mb-4 rounded w-1/4"
            name="type"
            value={user.type}
            onChange={handleChange}
            required
            >
            <option value="Admin">Admin</option>
            <option value="Freelancer">Freelancer</option>
            <option value="Buyer">Buyer</option>
            </select>
            
            <br></br>
        </div>


        <input type="submit" value="Update" className="bg-[#bc4d45] rounded hover:bg-[#6f2121] px-2 py-2"/>
      </form>
    </div>
  );
};

export default EditUser;