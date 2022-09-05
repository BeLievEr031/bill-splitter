import React from "react";
import "./Profile.css";
import Avatar from "react-avatar";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../../context/DataContextProvider";
function Profile() {
  const { user } = useContext(DataContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    window.localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <>
      <div className="profile">
        <Avatar name={user.name} size="35" round={true} />
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
