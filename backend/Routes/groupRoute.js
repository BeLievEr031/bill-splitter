import express from "express";
import auth from "../middleware/auth.js";
import {
  createGroup,
  addMember,
  getGroupInfo,
  populateActiveExpense
} from "../controller/groupController.js";

const groupRoute = express.Router();

groupRoute.post("/create", auth, createGroup);
groupRoute.post("/addmember/:groupID", auth, addMember);
groupRoute.get("/groupinfo/:groupID", auth, getGroupInfo);
groupRoute.get("/activeexpinfo/:groupID", auth, populateActiveExpense);
export default groupRoute;
