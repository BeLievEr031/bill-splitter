import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Profile from "../Profile/Profile";
import "./Dashboard.css";
import { DataContext } from "../../context/DataContextProvider";
import GroupBox from "../GroupBox/GroupBox";
import { useEffect } from "react";
import axios from "axios";
function Dashboard() {
  const navigate = useNavigate();
  const { user, handleActive, glbGroup, groupArr, setGroupArr } =
    useContext(DataContext);

  const handleViewAll = () => {
    navigate("/app/groups");
    handleActive();
  };

  useEffect(() => {
    async function fetchData() {
      const response = await axios({
        method: "get",
        url: `http://localhost:5000/api/v1/profile`,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });

      setGroupArr([...response.data.profile.group]);
    }

    fetchData();
  }, []);
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
          {groupArr.map((group, index) => {
            if (index >= 3) {
              return;
            }
            return <GroupBox group={group} index={index} key={index} />;
          })}
        </div>

        <div className="overview-cont">
          <h1>OverView</h1>
          <div className="expense-overview">
            <div className="lent">Total lent : {Math.floor(user.lent)}</div>
            <div className="owe">Total owe: {Math.floor(user.owe)}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
