import express from "express";
import {registerUser,loginUser} from "../controller/userController.js"
const userRouter = express.Router();

userRouter.post("/signup",registerUser);
userRouter.post("/login",loginUser);

export default userRouter;