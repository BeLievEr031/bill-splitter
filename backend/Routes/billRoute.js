import express from "express";
import auth from "../middleware/auth.js";
import { setBill } from "../controller/billController.js";

const billRouter = express.Router();

billRouter.post("/bill/:groupID", auth, setBill);

export default billRouter;
