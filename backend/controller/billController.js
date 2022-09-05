import UserModel from "../Models/UserModel.js";
import GroupModel from "../Models/GroupModel.js";
import BillModel from "../Models/BillModel.js";

const setBill = async (req, res) => {
  const { amount, desc, owner, owe } = req.body;
  const { groupID } = req.params;

  if (!groupID || !amount || !owner || !owe) {
    return res.json({
      status: false,
      msg: "All Fields Required....",
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

    const isPayi = await UserModel.findById(owner);
    if (!isPayi) {
      return res.json({
        status: false,
        msg: "Invalid Group...",
      });
    }
    let bill = {
      amount,
      desc,
      owner,
      owe,
    };

    bill = await new BillModel(bill);
    bill.save();
    console.log(owe);

    const user = await UserModel.findById(owner);
    user.lent = Number(user.lent) + Number(amount / (owe.length + 1));
    user.save();

    owe.map(async (member) => {
      let user = await UserModel.findById(member.payi_id);
      user.owe = Number(user.owe) + Number(member.due_amount);
      user.save();
    });

    const group = await GroupModel.findById(groupID);
    console.log(group.expenseArr);
    group.expensesArr.push(bill._id);
    group.activeexpenseArr.push(bill._id);
    group.expense = Number(group.expense) + Number(amount);
    group.save();

    res.json({
      status: true,
      bill,
    });
  } catch (error) {
    return res.json({
      status: false,
      err: error.message,
    });
  }
};

export { setBill };
