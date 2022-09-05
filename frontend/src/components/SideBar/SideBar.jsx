import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./SideBar.css";
function SideBar() {
  const [cactive, setCactive] = useState(true);
  return (
    <>
      <div className="logo">
        <h1>Split Bill</h1>
      </div>
      <div className="nav-wrapper">
        <Link
          onClick={() => {
            setCactive(true);
          }}
          to=""
          className={`link ${cactive ? "active" : "link-hvr"}`}
        >
          Home
        </Link>
        <Link
          onClick={() => {
            setCactive(false);
          }}
          to="groups"
          className={`link ${cactive === false ? "active" : "link-hvr"}`}
        >
          Groups
        </Link>
      </div>

      <div className="fill-space"></div>
    </>
  );
}

export default SideBar;
