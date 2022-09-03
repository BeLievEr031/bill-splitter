import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./GroupBox.css";
function GroupBox({ group, index }) {
  const navigate = useNavigate();
  const handleGroupDetail = () => {
    navigate(`groups/details/${group._id}`);
  };
  return (
    <>
      <div className="group-info">
        <div className="group-name">{group.groupname}</div>
        <div className="group-desc">{group.desc}</div>
        <div className="expense">Total Expense: {group.expense}</div>
        <div className="members">Total Members: {group.members.length}</div>
        <div className="open-btn" onClick={handleGroupDetail}>
          <b>open</b>
          <span className="material-symbols-outlined">open_in_new</span>
        </div>
      </div>
    </>
  );
}

export default GroupBox;
