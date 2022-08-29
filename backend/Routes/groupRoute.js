import express from "express";
import auth from "../middleware/auth.js";
import {
  createGroup,
  addMember,
  getGroupInfo,
} from "../controller/groupController.js";

const groupRoute = express.Router();

groupRoute.post("/create", auth, createGroup);
groupRoute.post("/add/:groupID", auth, addMember);
groupRoute.get("/groupinfo/:groupID", auth, getGroupInfo);
export default groupRoute;
