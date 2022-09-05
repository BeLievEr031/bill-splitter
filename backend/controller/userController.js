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
      msg: "User SignUp Successfully",
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
    const isExist = await UserModel.findOne({ email })
      .select("+password")
      .populate("group");
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
    isExist.password = null;
    const user = isExist;

    const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET);
    return res.json({
      status: true,
      msg: "User Login Successfully",
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

const getUser = async (req, res) => {
  const { id,email } = req.body;
  if (!id && !email) {
    return res.json({
      status: false,
      msg: "All fields required..",
    });
  }

  try {
    let user;

    if(id){
      user = await UserModel.findById(id);
    }else{
      user = await UserModel.findOne({email});
    }
    if (!user) {
      return res.json({
        status: false,
        msg: "No User Found..",
      });
    }

    res.json({
      status: true,
      user,
    });
  } catch (error) {
    return res.json({
      status: false,
      err: error.message,
    });
  }
};

export { registerUser, loginUser, getProfile, getUser };
