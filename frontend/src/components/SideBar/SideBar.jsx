import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../context/DataContextProvider";
import "./SideBar.css";
function SideBar() {
  const { active, handleActive } = useContext(DataContext);
  return (
    <>
      <div className="logo">
        <h1>Split Bill</h1>
      </div>
      <div className="nav-wrapper">
        <Link
          onClick={handleActive}
          to=""
          className={`link ${active == "home" ? "active" : "link-hvr"}`}
        >
          Home
        </Link>
        <Link
          onClick={handleActive}
          to="groups"
          className={`link ${active == "group" ? "active" : "link-hvr"}`}
        >
          Groups
        </Link>
      </div>

      <div className="fill-space"></div>
    </>
  );
}

export default SideBar;
