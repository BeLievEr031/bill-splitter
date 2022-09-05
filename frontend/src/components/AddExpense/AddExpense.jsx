import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../../context/DataContextProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AddExpense() {
  const params = useParams();
  const { user } = useContext(DataContext);
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
  const handleSetExpenseDetail = (e) => {
    console.log(expenseDetails);
    setExpenseDeatil({ ...expenseDetails, [e.target.name]: e.target.value });
  };
  const handleAddExpenseToDB = async () => {
    if (Number(expenseDetails.amount) <= 0) {
      return toast("The Amount Should be greater than 0", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        type: "error",
        theme: "dark",
      });
    }

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

    window.location.reload();
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
            <Link
              to={
                Number(expenseDetails.amount) <= 0
                  ? ""
                  : `/app/groups/details/${params.groupID}`
              }
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
            </Link>
          </button>
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

export default AddExpense;
