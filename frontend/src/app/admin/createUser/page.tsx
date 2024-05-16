"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

const CreateUserPage = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "", // Default role
  });

  const router = useRouter();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authToken = Cookies.get("accessToken");
      const res = await axios.post(
        "http://localhost:4000/profile/user",
        data,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        alert("User added successfully");
        router.push("/accessUser");
      } else {
        console.error("Failed to add user");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Error adding user. Please try again.");
    }
  };

  return (
    <div>
      {/* Navbar and LogoutButton components go here */}
      <h1>Add Contact</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Enter name"
          className="text-black mb-2 rounded w-1/4"
          role="text"
          name="name"
          value={data.name}
          onChange={handleChange}
          required
        />
        <br />
        <input
          placeholder="Enter email"
          className="text-black mb-2 rounded w-1/4"
          role="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          required
        />
        <br />
        <input
          placeholder="Enter password"
          className="text-black mb-2 rounded w-1/4"
          role="text"
          name="password"
          value={data.password}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="role">Type:</label> <br />
        <select
          className="text-black mb-4 rounded w-1/4"
          name="role"
          value={data.role}
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
          value="Submit"
          className="bg-[#bc4d45] rounded hover:bg-[#6f2121] px-2 py-2"
        />
      </form>
    </div>
  );
};

export default CreateUserPage;
