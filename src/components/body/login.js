import React, { useEffect } from "react";
import { useState } from "react";
import { login } from "../../functions";
import PulseLoader from "react-spinners/PulseLoader";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import "./style.css";
import { useDispatch } from "react-redux";

export default function Login({ show, setShow }) {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [adminLogin, setAdminLogin] = useState(false);
  const [message, setMessage] = useState();
  const [error, setError] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    setTimeout(async () => {
      let data = await login(username, password, adminLogin);
      localStorage.setItem("user", JSON.stringify(data));
      setError([data]);
      setMessage(data);

      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    if (
      !adminLogin &&
      message &&
      message?.result === "OK" &&
      message.user.isMember == true &&
      message.user.isAdmin == false
    ) {
      navigate("/home");
    } else if (
      adminLogin &&
      message &&
      message?.result === "OK" &&
      message.user.isMember == false &&
      message.user.isAdmin == true
    ) {
      navigate("/admin");
    }
  }, [message]);

  return (
    <div className="main_wrapper">
      <div className="topic">
        <p>Login</p>
      </div>
      <div className="switch_user">
        <div
          className={!adminLogin ? "fan_user" : ""}
          onClick={() => setAdminLogin(!adminLogin)}
        >
          <p>Members Login</p>
        </div>
        <div
          className={adminLogin ? "fan_user" : ""}
          onClick={() => setAdminLogin(!adminLogin)}
        >
          <p>Admin Login</p>
        </div>
      </div>
      <div className="input">
        <p>Username *</p>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {error
          ?.filter((error) => error.param === "username")
          .map((error, index) => (
            <div className="error">
              <span key={index}>{error.error}</span>
            </div>
          ))}

        <p>Password *</p>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error
          ?.filter((error) => error.param === "password")
          .map((error, index) => (
            <div className="error">
              <span key={index}>{error.error}</span>
            </div>
          ))}

        <div className="message">
          {!adminLogin &&
          message &&
          message?.result === "OK" &&
          message.user.isMember == false &&
          message.user.isAdmin == true ? (
            <div className="alert_message">
              <span className="close_icon">&times; </span>
              <span>Please switch to admin login & Try..</span>
            </div>
          ) : adminLogin &&
            message &&
            message?.result === "OK" &&
            message.user.isMember == true &&
            message.user.isAdmin == false ? (
            <div className="alert_message">
              <span className="close_icon">&times; </span>
              <span>Please switch to Members login & Try..</span>
            </div>
          ) : (
            <span>{message?.message}</span>
          )}
        </div>
      </div>

      <div className="submit_btn">
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? <PulseLoader color="black" size={5} /> : "Login"}
        </button>
      </div>
      <div className="way_to_login">
        <p>
          Don't have an account ?{" "}
          <span onClick={() => setShow(!show)}>Sign up</span>
        </p>
      </div>
    </div>
  );
}
