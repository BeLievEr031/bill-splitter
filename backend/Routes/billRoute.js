import express from "express";
import auth from "../middleware/auth.js";
import { setBill, payBill,getBill } from "../controller/billController.js";

const billRouter = express.Router();

billRouter.post("/bill/:groupID", auth, setBill);
billRouter.post("/bill/:expenseID/:payiID", auth, payBill);
billRouter.get("/bill/:expenseID", auth, getBill);

export default billRouter;
