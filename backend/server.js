import express from "express";
import dotenv from "dotenv";
import dbConnect from "./db/dbConnect.js";
import userRouter from "./Routes/userRouter.js";
import groupRoute from "./Routes/groupRoute.js";
import billRouter from "./Routes/billRoute.js";
const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbConnect();
app.use("/api/v1", userRouter);
app.use("/api/v1", groupRoute);
app.use("/api/v1", billRouter);
const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
  console.log("Connected To the PORT " + PORT);
});
