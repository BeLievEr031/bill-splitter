import React from "react";
import SideBar from "../SideBar/SideBar";
import "./Main.css";
import { Outlet } from "react-router-dom";
import Profile from "../Profile/Profile";

function Main() {
  return (
    <>
      <div className="main-cont">
        <div className="sidebar-cont">
          <SideBar />
        </div>
        <div className="outlet-cont">
          <Profile />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Main;
