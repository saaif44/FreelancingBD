"use client"
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

const EditUser = () => {
  const router = useRouter();
  const { id } = useParams();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    type: "Admin", // Default type
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authToken = Cookies.get("accessToken");
        const response = await axios.get(`http://localhost:4000/users/${id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const authToken = Cookies.get("accessToken");
      const response = await axios.patch(
        `http://localhost:4000/users/${id}`,
        user,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("User updated successfully!");
        router.push("/accessUser");
      } else {
        alert("Updating failed");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error updating user");
    }
  };

  return (
    <div>
      {/* Navbar and LogoutButton components go here */}
      <h1>Edit Contact</h1>
      <form onSubmit={handleUpdate}>
        <input
          placeholder="Enter name"
          className="text-black mb-2 rounded w-1/4"
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          required
        />
        <br />
        <input
          placeholder="Enter email"
          className="text-black mb-2 rounded w-1/4"
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          required
        />
        <br />
        <input
          placeholder="Enter password"
          className="text-black mb-2 rounded w-1/4"
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          required
        />
        <br />
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
        <br />
        <input
          type="submit"
          value="Update"
          className="bg-[#bc4d45] rounded hover:bg-[#6f2121] px-2 py-2"
        />
      </form>
    </div>
  );
};

export default EditUser;
