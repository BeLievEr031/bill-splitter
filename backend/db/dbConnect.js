import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("connected to db");
  } catch (error) {
    console.log(error.message);
  }
};

export default dbConnect;
