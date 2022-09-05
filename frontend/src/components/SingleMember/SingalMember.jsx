import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../../context/DataContextProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function SingalMember({ member }) {
  const params = useParams();
  console.log(params);
  const { user } = useContext(DataContext);
  const [isUser, setIsUser] = useState(false);
  useEffect(() => {
    async function fetchData() {
      let res = await axios({
        method: "get",
        url: `http://localhost:5000/api/v1/groupinfo/${params.groupID}`,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });

      console.log(res);
      setIsUser(res.data.group.owner === user._id);
    }
    fetchData();
  }, []);

  const handleDeleteUser = async () => {
    console.log(member);

    let res = await axios({
      method: "delete",
      url: `http://localhost:5000/api/v1/delete/${params.groupID}/${member._id}`,
      headers: {
        token: window.localStorage.getItem("token"),
      },
    });

    toast(res.data.msg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      type: "success",
      theme: "dark",
    });

    window.location.reload();
  };

  return (
    <>
      <div className="sigl-member">
        <div className="user-member-detail">
          <div className="user-info">
            <div className="user-name">
              <b>{member.name}</b>
            </div>
            <div className="user-email">{member.email}</div>
          </div>
          <div className="close-btn" onClick={handleDeleteUser}>
            {isUser ? (
              <span
                className="material-symbols-outlined"
                onClick={handleDeleteUser}
              >
                delete
              </span>
            ) : (
              ""
            )}
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

export default SingalMember;
