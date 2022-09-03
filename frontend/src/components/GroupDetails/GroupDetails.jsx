import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./GroupDetails.css";
import SingalMember from "../SingleMember/SingalMember";
import { useState } from "react";
import Bill from "../Bill/Bill";
import { useEffect } from "react";
import axios from "axios";
function GroupDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const [activeBill, setActiveBill] = useState("active");
  const [color, setColor] = useState(true);
  const [currGrpMembers, setCurrGrpMembers] = useState([]);
  const handleAddExpenseRedirect = () => {
    navigate("addexpense");
  };

  const setSettled = () => {
    setActiveBill("settled");
    setColor(false);
  };
  const setActive = () => {
    setActiveBill("active");
    setColor(true);
  };

  useEffect(() => {
    console.log(params);
    async function fetchData() {
      const response = await axios({
        method: "get",
        url: `http://localhost:5000/api/v1/groupinfo/${params.groupID}`,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });

      console.log(response);
      setCurrGrpMembers([...currGrpMembers, ...response.data.group.members]);
    }
    fetchData();
  }, []);
  return (
    <>
      <div className="group-detail">
        <div className="group-header" style={{ border: "none" }}>
          <h1>Group Name</h1>
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
        <div className="group-expenditure">
          <p style={{ marginBottom: "10px", fontSize: "25px" }}>Expense List</p>
          <div className="status">
            <div
              className="s-active"
              style={color ? { color: "blue" } : { color: "black" }}
              onClick={setActive}
            >
              Active
            </div>
            <div
              className="s-settled"
              style={color ? { color: "black" } : { color: "blue" }}
              onClick={setSettled}
            >
              settled
            </div>
          </div>

          <div className="bill">
            {activeBill === "active" ? (
              <>
                <Bill />
                <Bill />
                <Bill />
                <Bill />
                <Bill />
                <Bill />
                <Bill />
                <Bill />
                <Bill />
                <Bill />
                <Bill />
                <Bill />
              </>
            ) : (
              <>
                <Bill />
              </>
            )}
          </div>
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
            {currGrpMembers.map((member,index) => {
              return <SingalMember member={member} key={index}/>;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default GroupDetails;
