import React from "react";
import SingalMember from "../SingleMember/SingalMember";
import "./AddGroup.css";
function AddGroup() {
  return (
    <>
      <h1 className="add-grp-heading">Add group</h1>
      <div className="add-grp-wrapper">
        <div className="group-details-box">
          <h3 htmlFor="group-name">Group Name</h3>
          <input type="text" placeholder="Enter Group Name" />
          <h3 htmlFor="description">Description</h3>
          <input type="text" placeholder="Enter Group Description" />
          <br />
          <button>Add</button>
        </div>
        <div className="add-member-box">
          <h3>Members</h3>
          <br />

          <div className="search-box">
            <input id="search" type="email" placeholder="Search By Email..." />
            <div id="search-btn">search</div>
          </div>

          <h2 className="member" style={{ margin: "10px" }}>
            {" "}
            Member list
          </h2>
          <div className="member-list">
            <SingalMember />
            <SingalMember />
          </div>
        </div>
      </div>
    </>
  );
}

export default AddGroup;
