import mongoose from "mongoose";
import UserModel from "./UserModel.js";
const groupSchema = new mongoose.Schema({
  groupname: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
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
  expense: {
    type: Number,
    default: 0,
  },
});

const GroupModel = new mongoose.model("GroupModel", groupSchema);
export default GroupModel;
