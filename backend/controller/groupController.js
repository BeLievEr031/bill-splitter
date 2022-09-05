import GroupModel from "../Models/GroupModel.js";
import UserModel from "../Models/UserModel.js";
import BillModel from "../Models/BillModel.js";
const createGroup = async (req, res) => {
  const { groupname, desc, members } = req.body;

  if (!groupname) {
    return res.json({
      status: false,
      msg: "Name required...",
    });
  }

  try {
    const user = req.user;
    let group = {
      groupname,
      desc,
      owner: user._id,
      members: [user._id],
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
      status: false,
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
  console.log(groupID);
  if (!groupID) {
    return res.json({
      status: false,
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
    console.log(group);
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

const populateActiveExpense = async (req, res) => {
  const { groupID } = req.params;
  if (!groupID) {
    return res.json({
      status: true,
      msg: "Invalid Group...",
    });
  }
  try {
    const isGroup = await GroupModel.findById(groupID).populate(
      "activeexpenseArr"
    );

    if (!isGroup) {
      return res.json({
        status: false,
        msg: "Invalid Group...",
      });
    }
    const activeExpense = isGroup;
    res.json({
      status: true,
      activeExpense,
    });
  } catch (error) {
    return res.json({
      status: false,
      err: error.message,
    });
  }
};
const populateSettleExpense = async (req, res) => {
  const { groupID } = req.params;
  if (!groupID) {
    return res.json({
      status: true,
      msg: "Invalid Group...",
    });
  }
  try {
    const isGroup = await GroupModel.findById(groupID).populate(
      "settleExpenseArr"
    );

    if (!isGroup) {
      return res.json({
        status: false,
        msg: "Invalid Group...",
      });
    }
    const settleExpense = isGroup;
    res.json({
      status: true,
      settleExpense,
    });
  } catch (error) {
    return res.json({
      status: false,
      err: error.message,
    });
  }
};

const settleExpense = async (req, res) => {
  const { groupID, expenseID } = req.params;

  try {
    const group = await GroupModel.findById(groupID);
    const idx = group.activeexpenseArr.indexOf(expenseID);
    console.log(idx);
    group.activeexpenseArr.splice(idx, 1);
    group.settleExpenseArr.push(expenseID);
    await group.save();
    res.json({
      status: true,
      msg: "bill settled..",
      group,
    });
  } catch (err) {
    res.json({
      status: false,
      msg: err.message,
    });
  }
};

const setOwe = async (req, res) => {
  const { groupID } = req.params;
  const { userID } = req.body;
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
    const activeexpenseArr = isGroup.activeexpenseArr;
    activeexpenseArr.forEach(async (expenseID) => {
      let expense = await BillModel.findById(expenseID);
      const data = {
        payi_id: userID,
        due_amount: Number(expense.amount) / Number(expense.owe.length + 1),
      };
      expense.owe.push(data);
      await expense.save();
    });

    res.json({
      status: true,
    });
  } catch (error) {
    return res.json({
      status: false,
      err: error.message,
    });
  }
};

const deleteMember = async (req, res) => {
  const { groupID, userID } = req.params;

  try {
    const group = await GroupModel.findById(groupID);
    let idx = group.members.indexOf(userID);
    group.members.splice(idx, 1);
    await group.save();
    const user = await UserModel.findById(userID);
    idx = user.group.indexOf(groupID);
    user.group.splice(idx, 1);
    await user.save();
    const expense = group.activeexpenseArr;

    expense.forEach(async (expenseID) => {
      const currExpense = await BillModel.findById(expenseID);
      currExpense.owe.forEach(async (oweData, index) => {
        if (JSON.stringify(oweData.payi_id) === JSON.stringify(userID)) {
          console.log("-------------->");
          currExpense.owe.splice(index, 1);
          await currExpense.save();
        }
      });
    });
    res.json({
      status: true,
      msg: "user deleted",
    });
  } catch (error) {
    return res.json({
      status: false,
      msg: error.message,
    });
  }
};

export {
  createGroup,
  addMember,
  getGroupInfo,
  populateActiveExpense,
  populateSettleExpense,
  settleExpense,
  setOwe,
  deleteMember,
};
