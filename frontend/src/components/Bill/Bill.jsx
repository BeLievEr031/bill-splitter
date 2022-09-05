import axios from "axios";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { DataContext } from "../../context/DataContextProvider";
import Pop from "../PopUp/Pop";
function Bill({ expense }) {
  const { user } = useContext(DataContext);
  const [otherUser, setOtherUser] = useState();
  const [isPop, setIsPop] = useState(false);
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

    setOtherUser(res.data.user.name);
  };

  getAnotherUser();

  const handlePop = () => {
    console.log(expense._id);
    setIsPop(true);
  };
  return (
    <>
      <div className="all-active-bill" onClick={handlePop}>
        <div className="grp amount">
          <h3>Name</h3>
          <p>{expense.desc}</p>
        </div>

        <div className="owner date">
          <h3>owner</h3>
          <p>{expense.owner === user._id ? "you" : otherUser}</p>
        </div>

        <div className="lend">
          <h3>{expense.owner === user._id ? "lent" : "pay"}</h3>
          <p>{Math.floor(expense.amount / (expense.owe.length + 1))}</p>
        </div>

        <div className="pop">go</div>
      </div>
      {isPop ? <Pop expense={expense} setIsPop={setIsPop} /> : ""}
    </>
  );
}

export default Bill;
