import express from "express";
import auth from "../middleware/auth.js";
import {
  createGroup,
  addMember,
  getGroupInfo,
  populateActiveExpense,
  populateSettleExpense,
  settleExpense,
  setOwe,
  deleteMember
} from "../controller/groupController.js";

const groupRoute = express.Router();

groupRoute.post("/create", auth, createGroup);
groupRoute.post("/addmember/:groupID", auth, addMember);
groupRoute.get("/groupinfo/:groupID", auth, getGroupInfo);
groupRoute.get("/activeexpinfo/:groupID", auth, populateActiveExpense);
groupRoute.post("/setowe/:groupID", auth, setOwe);
groupRoute.get("/settle/:groupID", auth, populateSettleExpense);
groupRoute.delete("/delete/:groupID/:userID", auth, deleteMember);

groupRoute.post("/settle/:groupID/:expenseID", auth, settleExpense);
export default groupRoute;
