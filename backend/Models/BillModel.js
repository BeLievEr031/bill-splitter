import mongoose from "mongoose";
import UserModel from "./UserModel.js";
import GroupModel from "./GroupModel.js";
const billSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
  },
  groupID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GroupModel",
  },
  owe: [
    {
      payi_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
      },
      due_amount: {
        type: String,
        required: true,
      },
      isPaid: {
        type: Boolean,
        default: false,
      },
    },
  ],

  paid:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    }
  ]
});

const BillModel = new mongoose.model("BillModel", billSchema);
export default BillModel;
