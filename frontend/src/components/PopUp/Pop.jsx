import React from "react";
import { useContext } from "react";
import "./Pop.css";
import { DataContext } from "../../context/DataContextProvider";
import { useState } from "react";
import axios from "axios";
function Pop({ expense, setIsPop }) {
  console.log(expense);
  const { user } = useContext(DataContext);
  const [otherUser, setOtherUser] = useState();
  const [color, setColor] = useState(expense.owner === user._id);
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
  return (
    <>
      <div className="pop-overlay" onClick={() => setIsPop(false)}></div>
      <div className="pop-up">
        <div className="pop-close-btn">
          <span
            class="material-symbols-outlined"
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
            ? `You owe: $${Math.floor(
                Number(expense.amount) / Number(expense.owe.length + 1)
              )}`
            : `You lent: $${Math.floor(
                Number(expense.amount) / Number(expense.owe.length + 1)
              )}`}{" "}
        </h1>
        <h1 className="expense-settle">
          <h3>sandy</h3>
          <h3>suyash</h3>
          <h3>ankul</h3>
        </h1>
      </div>
    </>
  );
}

export default Pop;
