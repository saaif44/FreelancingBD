"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";



interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

const AllUser = () => {
  const [data, setData] = useState<User[]>([]);
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const router = useRouter();
  const authToken = Cookies.get("accessToken");

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:4000/profile/allusers", {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        setData(res.data);
        setFilteredData(res.data);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleEdit = (id: number) => {
    router.push(`/editUser/${id}`);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const res = await axios.delete(`http://localhost:4000/user/${id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        });

        if (res.status === 200) {
          alert("User deleted successfully!");
          const newData = data.filter((user) => user.id !== id);
          setData(newData);
          setFilteredData(newData);
        } else {
          alert("Delete failed");
          console.error("Delete failed:", res.status);
        }
      } catch (error) {
        console.error("Error during delete:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <table className="table table-bordered">
        {/* Table header */}
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Type</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {filteredData.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleEdit(user.id)}>Edit</button>
              </td>
              <td>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUser;
