// components/LogoutButton.js
"use client";
import Cookies from "js-cookie";
const LogoutButton = () => {
  const handleLogout = () => {
    Cookies.set("authToken", "", { expires: 0 });

    window.location.href = "/login";
  };

  return (
    <button
      onClick={handleLogout}
      className = "bg-red-500 px-3 py-2 rounded hover:bg-[#540505] mt-2"
    >
      Logout
    </button>
  );
};

export default LogoutButton;