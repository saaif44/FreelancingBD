"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import LogoutButton from "@/components/logoutButton";

const CreateUserPage = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    type: "",
  });

  const router = useRouter();
  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const sendData = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/user",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const result = await res.text();
        alert("User added successfully");
        router.push("/accessUser");
      } catch (error) {
        alert("error");
      }
    };
    sendData();
  };

  return (
    <div>
      <Navbar />
      <div style={{ textAlign: "right" }}>
        <LogoutButton />
      </div>
      <h1>Add Contact</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Enter name"
          className="text-black mb-2 rounded w-1/4"
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange}
          required
        />
        <br></br>
        
        <input
          placeholder="Enter email"
          className="text-black mb-2 rounded w-1/4"
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          required
        />
        <br></br>

        <input
          placeholder="Enter password"
          className="text-black mb-2 rounded w-1/4"
          type="text"
          name="password"
          value={data.password}
          onChange={handleChange}
          required
        />
        <br></br>
        <label htmlFor="type">Type:</label> <br />
        <select
         className="text-black mb-4 rounded w-1/4"
          name="type"
          value={data.type}
          onChange={handleChange}
          required
        >
          <option value="Admin">Admin</option>
          <option value="Freelancer">Freelancer</option>
          <option value="Buyer">Buyer</option>
        </select>
        <br></br>
        <input type="submit" value="Submit" className="bg-[#bc4d45] rounded hover:bg-[#6f2121] px-2 py-2"/>
      </form>
    </div>
  );
};

export default CreateUserPage;