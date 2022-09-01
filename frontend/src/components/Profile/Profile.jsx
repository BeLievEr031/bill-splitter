import React from "react";
import "./Profile.css";
import Avatar from "react-avatar";
import { useNavigate } from "react-router-dom";
function Profile() {
  const navigate = useNavigate();
  const handleLogout = () => {
    window.localStorage.removeItem("isLogin");
    navigate("/");
  };
  return (
    <>
      <div className="profile">
        <Avatar name="Foo Bar" size="35" round={true} />
        <div className="logout">
          <span
            className="material-symbols-outlined logout"
            onClick={handleLogout}
          >
            power_settings_new
          </span>
        </div>
      </div>
    </>
  );
}

export default Profile;
