import express from "express";
import { registerUser, loginUser,getProfile,getUser } from "../controller/userController.js";
import auth from "../middleware/auth.js";
const userRouter = express.Router();

userRouter.post("/signup", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", auth, getProfile);
userRouter.post("/getuser", auth, getUser);

export default userRouter;
