import React from "react";
import "../styles/landing.css";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <>
      <div className="landingPageContainer">
        <nav>
          <div className="navHeader">
            <h2>SyncMeet</h2>
          </div>
          <div className="navlist">
            <p>Join as Guest</p>
            <p>Register</p>
            <div role="button">
              <p>Login</p>
            </div>
          </div>
        </nav>

        <div className="landingMainContainer">
          <div>
            <h1>
              <span style={{ color: "#ff9839" }}>connect</span> with your loved
              ones
            </h1>
            <p>cover a distance by SyncMeet</p>
            <div role="button">
              <Link to={"/home"}>Get started</Link>
            </div>
          </div>
          <div>
            <img src="/image1.jpg" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
