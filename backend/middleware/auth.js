import jwt from "jsonwebtoken";
import UserModel from "../Models/UserModel.js";
const auth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    const { userID } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(userID);
    req.user = user;
    next();
  } catch (error) {
    return res.json({
      status: false,
      err: error.message,
    });
  }
};

export default auth;
