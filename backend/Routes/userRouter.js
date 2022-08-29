import express from "express";
import { registerUser, loginUser,getProfile } from "../controller/userController.js";
import auth from "../middleware/auth.js";
const userRouter = express.Router();

userRouter.post("/signup", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", auth, getProfile);

export default userRouter;
