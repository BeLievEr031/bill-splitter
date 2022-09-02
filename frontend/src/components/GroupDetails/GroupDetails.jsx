import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./GroupDetails.css";
function GroupDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const handleAddExpenseRedirect = () => {
    navigate("addexpense");
  };
  return (
    <>
      <div className="group-detail">
        <div className="group-header" style={{ border: "none" }}>
          <h1>Your Groups</h1>
          <div
            to="/app/addgroup"
            className="view-all add-grp-btn"
            onClick={handleAddExpenseRedirect}
          >
            <span className="material-symbols-outlined">add_circle</span>
            add Expense
          </div>
        </div>
      </div>

      <div className="add-grp-wrapper">
        <div className="group-details-box"></div>

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
          <div className="member-list"></div>
        </div>
      </div>
    </>
  );
}

export default GroupDetails;
