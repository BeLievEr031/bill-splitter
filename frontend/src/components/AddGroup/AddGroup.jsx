import React from "react";
import { useState, useEffect } from "react";
import SingalMember from "../SingleMember/SingalMember";
import "./AddGroup.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { DataContext } from "../../context/DataContextProvider";
import jwtdecode from "jwt-decode";
import axios from "axios";
function AddGroup() {
  // const { user } = useContext(DataContext);
  const token = window.localStorage.getItem("token");

  const user = {
    _id: "630d01100fa9cc917a90ce46",
    name: "abc",
    email: "a@gmail.com",
    password: null,
  };

  const [userEmail, setUserEmail] = useState({
    email: "",
  });

  const { memberArr, setMemberArr } = useContext(DataContext);
  const [groupDetail, setGroupDetail] = useState({
    groupname: "",
    desc: "",
  });
  const handleSetMember = (e) => {
    setUserEmail({ ...userEmail, [e.target.name]: e.target.value });
  };

  const handleMemberArrFill = () => {
    setMemberArr([...memberArr]);
  };

  const handleSetGroupDetail = (e) => {
    setGroupDetail({
      ...groupDetail,
      [e.target.name]: e.target.value,
    });
  };

  const [currGroupId, setCurrGroupId] = useState(null);

  const handleSaveGroupToDB = async () => {
    console.log(groupDetail);

    if (groupDetail.groupname.length === 0) {
      toast("All Fields Required...", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        type: "error",
        theme: "dark",
      });
      return;
    }

    const response = await axios({
      method: "post",
      url: "http://localhost:5000/api/v1/create",
      headers: {
        token,
      },
      data: groupDetail,
    });
    console.log(response);

    const res = response.data;
    setCurrGroupId(res.group._id);
  };

  const handleAddingMebmerToCurrGroup = async () => {
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
        token,
      },
      data: { email: userEmail.email },
    });

    const res = response.data;
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

    if (!currGroupId) {
      return toast("Please Create Group First..", {
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
      url: `http://localhost:5000/api/v1/addmember/${currGroupId}`,
      headers: {
        token,
      },
      data: { email: userEmail.email },
    });

    console.log(response);

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
    setMemberArr([...memberArr, res.user]);
  };

  const handleDeleteMemberFromGroup = (email) => {
    const newMemberArr = memberArr.filter((member) => {
      return member.email != email;
    });

    setMemberArr([...newMemberArr]);
  };
  return (
    <>
      <h1 className="add-grp-heading">Add group</h1>
      <div className="add-grp-wrapper">
        <div className="group-details-box">
          <h3 htmlFor="group-name">Group Name</h3>
          <input
            value={groupDetail.groupname}
            name="groupname"
            type="text"
            placeholder="Enter Group Name"
            onChange={(e) => handleSetGroupDetail(e)}
          />
          <h3 htmlFor="description">Description</h3>
          <input
            value={groupDetail.desc}
            name="desc"
            type="text"
            placeholder="Enter Group Description"
            onChange={(e) => handleSetGroupDetail(e)}
          />
          <br />
          <button onClick={handleSaveGroupToDB}>Add</button>
        </div>
        <div className="add-member-box">
          <h3>Members</h3>
          <br />

          <div className="search-box">
            <input
              id="search"
              value={userEmail.email}
              name="email"
              onChange={(e) => handleSetMember(e)}
              type="email"
              placeholder="Search By Email..."
              required
            />
            <div id="search-btn" onClick={handleAddingMebmerToCurrGroup}>
              search
            </div>
          </div>

          <h2 className="member" style={{ margin: "10px" }}>
            {" "}
            Member list
          </h2>
          <div className="member-list">
            {memberArr.map((member, index) => {
              return (
                <SingalMember
                  handleDeleteMemberFromGroup={handleDeleteMemberFromGroup}
                  member={member}
                  key={index}
                />
              );
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

export default AddGroup;
