import express from "express";
import dotenv from "dotenv";
import dbConnect from "./db/dbConnect.js";
import userRouter from "./Routes/userRouter.js";
const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbConnect();
app.use("/api/v1", userRouter);
const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
  console.log("Connected To the PORT " + PORT);
});
