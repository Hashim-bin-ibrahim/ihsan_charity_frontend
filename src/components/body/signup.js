import React from "react";
import { useState } from "react";
import { signup } from "../../functions";
import PulseLoader from "react-spinners/PulseLoader";
import Login from "./login.js";
import { useDispatch } from "react-redux";
import "./style.css";
export default function Body() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState([]);
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setTimeout(async () => {
      let data = await signup(username, mobile, password);
      setError(data.errors);
      setMessage(data);
      dispatch({ type: "LOGIN", payload: data });
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      {show && (
        <div className="main_wrapper">
          <div className="topic">
            <p>Create Your Ihsaan Account</p>
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
                  <span key={index}>{error.msg}</span>
                </div>
              ))}

            <p>Mobile No *</p>
            <input
              type="number"
              placeholder="Mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            {error
              ?.filter((error) => error.param === "mobile")
              .map((error, index) => (
                <div className="error">
                  <span key={index}>{error.msg}</span>
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
                  <span key={index}>{error.msg}</span>
                </div>
              ))}
            <div className="message">
              {!error && message ? (
                <span>
                  {message?.message ? (
                    message?.message
                  ) : (
                    <span className="error">{message?.error}</span>
                  )}
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="submit_btn">
            <button onClick={handleSubmit} disabled={loading}>
              {loading ? <PulseLoader color="black" size={5} /> : "Sign Up"}
            </button>
          </div>
          <div className="way_to_login">
            <p>
              {!error && message
                ? message.message
                  ? ""
                  : ""
                : " Already have an account ?"}

              <span onClick={() => setShow(!show)}>
                {!error && message
                  ? message.message
                    ? ` Welcome ${username} lets Login`
                    : ""
                  : "Log In"}
              </span>
            </p>
          </div>
        </div>
      )}
      {!show && <Login show={show} setShow={setShow} />}
    </>
  );
}
