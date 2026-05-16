import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("user-info");
    if (!data) {
      navigate("/auth"); // Changed from "/login" since your route in App.jsx is "/auth"
      return;
    }
    const userData = JSON.parse(data);
    setUserInfo(userData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user-info");
    navigate("/auth");
  };
  return (
    <div>
      <h1>welcome {userInfo?.name}</h1>
      <h3>Email: {userInfo?.username}</h3>
      {userInfo?.image ? (
        <img
          src={userInfo.image}
          alt="Profile"
          referrerPolicy="no-referrer" // Keeps Chrome from blocking the Google image URL
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            marginTop: "10px",
          }}
        />
      ) : (
        <p>No image found</p>
      )}

      <button onClick={handleLogout} className="cursor-pointer">
        Logout
      </button>
    </div>
  );
}
