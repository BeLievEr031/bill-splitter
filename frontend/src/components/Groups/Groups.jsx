import React, { useContext } from "react";
import TableRow from "../TableRow/TableRow";
import "./Groups.css";
import { DataContext } from "../../context/DataContextProvider";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function Groups() {
  const { user, glbGroup, groupArr, setGroupArr } = useContext(DataContext);
  // const []
  const navigate = useNavigate();
  const handleAddGroup = () => {
    navigate("addgroup");
  };

  return (
    <>
      <div className="group-detail">
        <div className="group-header" style={{ border: "none" }}>
          <h1>Your Groups</h1>
          <Link to="/app/addgroup" className="view-all add-grp-btn">
            <span className="material-symbols-outlined">add_circle</span>
            add Group
          </Link>
        </div>
      </div>

      <div className="table-data">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Members</th>
              <th>Total Expense</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {groupArr.map((group, index) => {
              return <TableRow group={group} index={index} key={index} />;
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Groups;
