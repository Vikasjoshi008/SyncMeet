import React from "react";
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    <>
      <h1>page not found</h1>
      <button onClick={() => navigate("/auth")}>Log in</button>
    </>
  );
}
