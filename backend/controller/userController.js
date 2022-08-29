import UserModel from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({
      status: false,
      msg: "All Field Required...",
    });
  }
  try {
    const isExist = await UserModel.findOne({ email });
    if (isExist) {
      return res.json({
        status: false,
        msg: "Email Already Exits..",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    let user = {
      name,
      email,
      password: hashedPassword,
    };

    user = await new UserModel(user);
    user.save();
    return res.json({
      status: true,
      user,
    });
  } catch (error) {
    return res.json({
      status: false,
      msg: error.message,
    });
  }
};
const loginUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password) {
    return res.json({
      status: false,
      msg: "All Field Required...",
    });
  }
  try {
    const isExist = await UserModel.findOne({ email }).select("+password");
    if (!isExist) {
      return res.json({
        status: false,
        msg: "Wrong Credentials...",
      });
    }

    const isPassword = await bcrypt.compare(password, isExist.password);
    if (!isPassword) {
      return res.json({
        status: false,
        msg: "Wrong Credentials...",
      });
    }

    const user = isExist;

    const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET);
    return res.json({
      status: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const getProfile = async (req, res) => {
  const user = req.user;
  const profile = await UserModel.findById(user._id).populate("group");
  res.json({
    status: true,
    profile,
  });
};

export { registerUser, loginUser,getProfile };
