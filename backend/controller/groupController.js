import GroupModel from "../Models/GroupModel.js";
import UserModel from "../Models/UserModel.js";
const createGroup = async (req, res) => {
  const { name, members } = req.body;

  if (!name) {
    return res.json({
      status: false,
      msg: "Name required...",
    });
  }

  try {
    const user = req.user;
    let group = {
      name,
      owner: user._id,
      members,
    };

    group = await new GroupModel(group);
    group.save();
    let addUser = await UserModel.findById(user._id);
    addUser.group.push(group._id);
    addUser.save();
    res.json({
      status: true,
      group,
    });
  } catch (error) {
    res.json({
      status: false,
      err: error.message,
    });
  }
};

const addMember = async (req, res) => {
  const { groupID } = req.params;
  if (!groupID) {
    return res.json({
      status: true,
      msg: "Invalid Group...",
    });
  }

  try {
    const isGroup = await GroupModel.findById(groupID);

    if (!isGroup) {
      return res.json({
        status: false,
        msg: "Invalid Group...",
      });
    }
    const group = isGroup;
    const { email } = req.body;
    if (!email) {
      return res.json({
        status: false,
        msg: "Field required..",
      });
    }
    const isUser = await UserModel.findOne({ email });

    if (!isUser) {
      return res.json({
        status: false,
        msg: "Invalid user...",
      });
    }
    const user = isUser;
    const isAdded = group.members.includes(isUser._id);

    if (isAdded) {
      return res.json({
        status: false,
        msg: "User Already added.",
      });
    }

    group.members.push(user._id);
    group.save();
    user.group.push(group._id);
    user.save();

    res.json({
      status: true,
      msg: "User Added",
    });
  } catch (error) {
    return res.json({
      status: false,
      err: error.message,
    });
  }
};

const getGroupInfo = async (req, res) => {
  const { groupID } = req.params;
  if (!groupID) {
    return res.json({
      status: true,
      msg: "Invalid Group...",
    });
  }
  try {
    const isGroup = await GroupModel.findById(groupID).populate("members");

    if (!isGroup) {
      return res.json({
        status: false,
        msg: "Invalid Group...",
      });
    }
    const group = isGroup;
    res.json({
      status: true,
      group,
    });
  } catch (error) {
    return res.json({
      status: false,
      err: error.message,
    });
  }
};
export { createGroup, addMember,getGroupInfo };
