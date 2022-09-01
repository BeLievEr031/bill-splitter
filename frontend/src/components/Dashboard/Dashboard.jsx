import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Profile from "../Profile/Profile";
import "./Dashboard.css";
import { DataContext } from "../../context/DataContextProvider";
import GroupBox from "../GroupBox/GroupBox";

function Dashboard() {
  const navigate = useNavigate();
  const { active, handleActive, glbGroup } = useContext(DataContext);

  const handleViewAll = () => {
    navigate("/app/groups");
    handleActive();
  };
  return (
    <>
      <div className="group-detail">
        <div className="group-header">
          <h1>Your Groups</h1>
          <div className="view-all" onClick={handleViewAll}>
            view All
            <span className="material-symbols-outlined">open_in_new</span>
          </div>
        </div>

        <div className="group-card">
          {glbGroup.map((group, index) => {
            if (index >= 3) {
              return;
            }
            return <GroupBox group={group} key={index} />;
          })}
        </div>

        <div className="overview-cont">
          <h1>OverView</h1>
          <div className="expense-overview">
            <div className="lent">Total lent : 200</div>
            <div className="owe">Total owe: 220</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
