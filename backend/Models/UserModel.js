import mongoose from "mongoose";
import date from "date-and-time";
const now = new Date();
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "All Fields Required..."],
  },

  email: {
    type: String,
    required: [true, "All Fields Required..."],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "All Fields Required..."],
    select: false,
  },

  group: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GroupModel",
    },
  ],

  lent: {
    type: Number,
    default: 0,
  },
  owe: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: date.format(now, "YYYY/MM/DD HH:mm:ss"),
  },
});

const UserModel = mongoose.model("UserModel", userSchema);
export default UserModel;
