"use client";

import {  useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  type: string;
}

const AllUser = () => {
  const [data, setData] = useState<User[]>([]);
  const router = useRouter();
  const [editId, setEditId] = useState(-1);
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const [uName, setuName] = useState("");
  const [uEmail, setuEmail] = useState("");
  const [uPassword, setuPassword] = useState("");

  const handleAdd = () => {
    router.push("/createUser");
  };

  const handleEdit = async (id: any) => {
    router.push(`/editUser/${id}`);
  };

  const handleDelete = async (id: any) => {
    if (window.confirm("Are you sure you want to delete this User?")) {
      try {
          const res = await fetch(`http://localhost:3000/user/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
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
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/user/", {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
        });
        if (res.ok) {
          const result = await res.json();
          setData(result);
          setFilteredData(result);
        } else {
          alert("Empty");
        }
      } catch (error) {
        alert("Error");
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <table className="table table-bordered ">
        <thead >
          <tr >
            <th className="border border-[#3f9dac]">Id</th>
            <th className="border border-[#3f9dac]">Name</th>
            <th className="border border-[#3f9dac]">Email</th>
            <th className="border border-[#3f9dac]">Password</th>
            <th className="border border-[#3f9dac]">Type</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((user) =>
            user.id === editId ? (
              <tr>
                <td className="border border-[#3f9dac]">
                  <input type="number" value={user.id} />
                </td>
                <td className="border border-[#3f9dac]">
                  <input type="text" value={uName} />
                </td>
                <td className="border border-[#3f9dac]">
                  <input type="text" value={uEmail} />
                </td>
                <td className="border border-[#3f9dac]">
                  <input type="text" value={uPassword} />
                </td>
                <td className="border border-[#3f9dac]">
                  <input type="text" value={1} />
                </td>
                <td >
                  <button
                    style={{
                      padding: "10px",
                      backgroundColor: "#006400",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={user.id}>
                <td className="border border-[#3f9dac] rounded">{user.id}</td>
                <td className="border border-[#3f9dac] rounded">{user.name}</td>
                <td className="border border-[#3f9dac] rounded">{user.email}</td>
                <td className="border border-[#3f9dac] rounded">{user.password}</td>
                <td className="border border-[#3f9dac] rounded">{user.type}</td>
                <td >
                  <button
                    onClick={() => handleEdit(user.id)}
                    style={{
                      padding: "10px",
                      backgroundColor: "#333",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user.id)}
                    style={{
                      padding: "10px",
                      backgroundColor: "#dc3545",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <br />
      <button
        onClick={handleAdd}
        style={{
          padding: "10px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Add User
      </button>{" "}
    </div>
  );
};

export default AllUser;