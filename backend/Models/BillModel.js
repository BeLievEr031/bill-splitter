import mongoose from "mongoose";
import UserModel from "./UserModel.js";
import GroupModel from "./GroupModel.js";
const billSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  payi: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
  },

  groupID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GroupModel",
  },
  otherpayi: [
    {
      payi_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
      },
      due_amount: {
        type: Number,
        required: true,
      },
      isPaid:{
        type:Boolean,
        default:false
      }
    },
  ],
});

const BillModel = new mongoose.model("BillModel", billSchema);
export default BillModel;
