import mongoose from "mongoose";
import UserModel from "./UserModel.js";
const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
  ],
});

const GroupModel = new mongoose.model("GroupModel", groupSchema);
export default GroupModel;
