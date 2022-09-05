import React from "react";
import { useContext } from "react";
import "./Pop.css";
import { DataContext } from "../../context/DataContextProvider";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
function Pop({ expense, setIsPop }) {
  const { user } = useContext(DataContext);
  const params = useParams();
  const [otherUser, setOtherUser] = useState();
  const [owe, setOwe] = useState();
  const [paidUser, setPaidUser] = useState([]);
  const [color, setColor] = useState(expense.owner === user._id);
  const [settleArr, setSettleArr] = useState([]);
  const getAnotherUser = async () => {
    let res = await axios({
      method: "post",
      url: "http://localhost:5000/api/v1/getuser",
      headers: {
        token: window.localStorage.getItem("token"),
      },
      data: {
        id: expense.owner,
      },
    });

    console.log(res.data);
    setOtherUser(res.data.user.name);
  };

  getAnotherUser();

  const handleSettlingBill = async () => {
    const res = await axios({
      method: "post",
      url: `http://localhost:5000/api/v1//bill/${expense._id}/${user._id}`,
      headers: {
        token: window.localStorage.getItem("token"),
      },
      data: {},
    });

    if (res.data.status) {
      toast(res.data.msg, {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        type: "success",
        theme: "dark",
      });
    } else {
      return toast(res.data.msg, {
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

    window.location.reload();
  };

  useEffect(() => {
    const userOwe = expense.owe.filter((oweUser) => {
      return oweUser.payi_id === user._id;
    });
    const data = {
      ...userOwe[0],
    };
    setOwe(data);
  }, []);

  useEffect(() => {
    async function fetchData() {
      let res = await axios({
        method: "get",
        url: `http://localhost:5000/api/v1/bill/${expense._id}`,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });

      setPaidUser([...res.data.oweUsers.paid]);
    }

    fetchData();
  }, []);

  const handleSettleBillToDB = async () => {
    let res = await axios({
      method: "post",
      url: `http://localhost:5000/api/v1/settle/${params.groupID}/${expense._id}`,
      headers: {
        token: window.localStorage.getItem("token"),
      },
      data: {},
    });
    setIsPop(false);
    toast("Amount Settled...", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      type: "success",
      theme: "dark",
    });

    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <>
      <div className="pop-overlay" onClick={() => setIsPop(false)}></div>
      <div className="pop-up">
        <div className="pop-close-btn">
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "35px", cursor: "pointer" }}
            onClick={() => setIsPop(false)}
          >
            cancel
          </span>
        </div>
        <div className="pop-head">
          <div className="pop-expense-detail">
            <h3 className="expense-desc">{expense.desc}</h3>
            <p className="expense-owner">owner:{otherUser}</p>
          </div>
          <div className="pop-expense-amount">
            <h4>${expense.amount}</h4>
          </div>
        </div>
        <h1
          className="expense-lent-owe"
          style={color ? { color: "green" } : { color: "red" }}
        >
          {expense.owner !== user._id
            ? `You owe: $${Math.floor(Number(!owe ? "" : owe.due_amount))}`
            : `You lent: $${Math.floor(
                Number(expense.amount) / Number(expense.owe.length + 1)
              )}`}{" "}
        </h1>
        <div className="expense-settle">
          {paidUser.map((user) => {
            return <h1>{user.name}</h1>;
          })}
        </div>

        <div
          className="settle-btn"
          onClick={
            expense.owner === user._id
              ? handleSettleBillToDB
              : !owe
              ? () => {}
              : owe.isPaid
              ? () => {}
              : handleSettlingBill
          }
        >
          {expense.owner === user._id
            ? "settle"
            : !owe
            ? ""
            : owe.isPaid
            ? "paid"
            : "pay"}
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

export default Pop;
