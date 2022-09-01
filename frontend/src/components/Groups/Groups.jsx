import React from "react";
import "./Groups.css";
function Groups() {
  return (
    <>
      <div className="group-detail">
        <div className="group-header">
          <h1>Your Groups</h1>
          <button className="view-all add-grp-btn">
            <span className="material-symbols-outlined">add_circle</span>
            add Group
          </button>
        </div>
      </div>
    </>
  );
}

export default Groups;
