import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
function AddExpense() {
  const param = useParams();
  const navigate = useNavigate();
  console.log(param.groupID);
  const handleNavigation = () => {
    navigate();
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
          <input type="text" placeholder="Enter Description" />
          <h3 htmlFor="group-name">Amount</h3>
          <input type="number" placeholder="Enter Amount" />
          <br />

          <button>
            <Link
              to={`/app/groups/details/${param.groupID}`}
              onClick={handleNavigation}
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
    </>
  );
}

export default AddExpense;
