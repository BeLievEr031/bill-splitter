import UserModel from "../Models/UserModel.js";
import bcrypt from "bcrypt";
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
    const isExist = await UserModel.findOne({ email });
    if (isExist) {
      return res.json({
        status: false,
        msg: "Wrong Credentials...",
      });
    }
  } catch (error) {}
};

export { registerUser, loginUser };
