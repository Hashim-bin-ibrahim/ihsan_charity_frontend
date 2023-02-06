import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

export default function Header({ user }) {
  console.log("user", user);
  const navigate = useNavigate();
  

  return (
    <div className="header_wrapper">
      <div className="main_header_wrap">
        <div className="right-header">
          <img src="../../ihsaan_logo_2.png" alt="" width={"100px"} />
        </div>
        <div className="left_header">
          <div className="signup">
            {user?.username ? (
              <h3 id="logout-button" onClick={()=>localStorage.clear()}>Log out</h3>
            ) : (
              <h3 onClick={() => navigate("/login")}> Log In</h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
