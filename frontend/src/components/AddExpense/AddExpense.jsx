import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../../context/DataContextProvider";
function AddExpense() {
  const params = useParams();
  const { user, glbCurrGrpMemberArr } = useContext(DataContext);
  const [localCurrGrpMemberArr, setlocalCurrGrpMemberArr] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let res = await axios({
        method: "get",
        url: `http://localhost:5000/api/v1/groupinfo/${params.groupID}`,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });

      setlocalCurrGrpMemberArr([...res.data.group.members]);
    }
    fetchData();
  }, []);

  console.log(localCurrGrpMemberArr);

  const [expenseDetails, setExpenseDeatil] = useState({
    amount: "",
    desc: "",
  });
  const navigate = useNavigate();
  const handleSetExpenseDetail = (e) => {
    console.log(expenseDetails);
    setExpenseDeatil({ ...expenseDetails, [e.target.name]: e.target.value });
  };
  const handleAddExpenseToDB = async () => {
    let otherMember = localCurrGrpMemberArr.filter((member) => {
      return member._id !== user._id;
    });

    otherMember = otherMember.map((member) => {
      const memberData = {
        payi_id: member._id,
        due_amount: Number(
          expenseDetails.amount / localCurrGrpMemberArr.length
        ),
      };

      return memberData;
    });

    const expenseData = {
      ...expenseDetails,
      owner: user._id,
      owe: otherMember,
    };
    console.log(expenseData);

    let res = await axios({
      method: "post",
      url: `http://localhost:5000/api/v1/bill/${params.groupID}`,
      headers: {
        token: window.localStorage.getItem("token"),
      },
      data: expenseData,
    });

    console.log(res.data);
  };
  return (
    <>
      <div className="group-detail">
        <div className="group-header" style={{ border: "none" }}>
          <h1>Your Expense</h1>
        </div>
      </div>

      <div className="add-grp-wrapper">
        <div className="group-details-box">
          <h3 htmlFor="description">Description</h3>
          <input
            onChange={(e) => handleSetExpenseDetail(e)}
            type="text"
            name="desc"
            placeholder="Enter Description"
          />
          <h3 htmlFor="group-name">Amount</h3>
          <input
            onChange={(e) => handleSetExpenseDetail(e)}
            name="amount"
            type="number"
            placeholder="Enter Amount"
          />
          <br />

          <button>
            <div
              // to={`/app/groups/details/${params.groupID}`}
              onClick={handleAddExpenseToDB}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                color: "white",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Add
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

export default AddExpense;
