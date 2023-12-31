import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sendRequest } from "../../../helpers/request";

import "./leftSection.css";

function LeftSection() {
  const [username, setUsername] = useState(0);
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await sendRequest({
        body: { username, password },
        route: "/signin",
        method: "POST",
      });

      console.log(response);

      //Save token to localstorage
      localStorage.setItem("token", response);

      switch (JSON.parse(atob(response.split(".")[1])).role) {
        case "admin":
          navigate("/admin");
          break;
        case "doctor":
          navigate("/doctor");
          break;
        case "patient":
          navigate("/patient");
          break;
        default:
          console.log("No Token");
          break;
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="login-container flex column center">
      <form action="" method="POST" onSubmit={login}> 
        <div className="input">
          <p>UserID</p>
          <input
            type="text"
            className="input-field"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input">
          <p>Password</p>
          <input
            type="password"
            className="input-field"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type="submit" value="Sign In" className="login-btn" />
      </form>
    </div>
  );
}

export default LeftSection;
