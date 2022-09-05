import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./GroupDetails.css";
import SingalMember from "../SingleMember/SingalMember";
import { useState } from "react";
import Bill from "../Bill/Bill";
import { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { DataContext } from "../../context/DataContextProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function GroupDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const { user, groupArr, setGroupArr, setGlbCurrGrpMemberArr } =
    useContext(DataContext);
  const [activeBill, setActiveBill] = useState("active");
  const [color, setColor] = useState(true);
  const [currGrpMembers, setCurrGrpMembers] = useState([]);
  const [activeExpense, setActiveExpense] = useState([]);
  const [userEmail, setUserEmail] = useState({
    email: "",
  });

  useEffect(() => {
    async function fetchData() {
      let res = await axios({
        method: "get",
        url: `http://localhost:5000/api/v1//activeexpinfo/${params.groupID}`,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });

      console.log(res.data.activeExpense.activeexpenseArr);
      setActiveExpense([...res.data.activeExpense.activeexpenseArr]);
    }
    fetchData();
  }, []);

  const handleAddExpenseRedirect = () => {
    navigate("addexpense");
    console.log(currGrpMembers);
    setGlbCurrGrpMemberArr([...currGrpMembers]);
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

  const handleAddMember = async () => {
    if (userEmail.email.length === 0) {
      return toast("All Fields Required...", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        type: "error",
        theme: "dark",
      });
    }

    let response;

    response = await axios({
      method: "post",
      url: "http://localhost:5000/api/v1/getuser",
      headers: {
        token: window.localStorage.getItem("token"),
      },
      data: { email: userEmail.email },
    });

    let res = response.data;
    if (res.status === false) {
      return toast(res.msg, {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        type: "error",
        theme: "dark",
      });
    }

    response = await axios({
      method: "post",
      url: `http://localhost:5000/api/v1/addmember/${params.groupID}`,
      headers: {
        token: window.localStorage.getItem("token"),
      },
      data: { email: userEmail.email },
    });

    if (response.data.status === false) {
      return toast(response.data.msg, {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        type: "error",
        theme: "dark",
      });
    }
    toast(response.data.msg, {
      position: "top-center",
      autoClose: 500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      type: "success",
      theme: "dark",
    });

    setCurrGrpMembers([...currGrpMembers, res.user]);
    let popGrp = groupArr.pop();
    popGrp.members.push(res.user._id);
    setGroupArr([...groupArr, popGrp]);
  };
  return (
    <>
      <div className="group-detail">
        <div className="group-header" style={{ border: "none" }}>
          <h1>Group Name</h1>
          <div
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
                {activeExpense.map((expense,index) => {
                  return <Bill expense={expense} key={index}/>;
                })}
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
            <input
              id="search"
              name="email"
              value={userEmail.email}
              onChange={(e) =>
                setUserEmail({ ...userEmail, [e.target.name]: e.target.value })
              }
              type="email"
              placeholder="Search By Email..."
            />
            <div id="search-btn" onClick={handleAddMember}>
              search
            </div>
          </div>

          <h2 className="member" style={{ margin: "10px" }}>
            {" "}
            Member list
          </h2>

          <div className="member-list">
            {currGrpMembers.map((member, index) => {
              return <SingalMember member={member} key={index} />;
            })}
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default GroupDetails;
