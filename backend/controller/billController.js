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

const payBill = async (req, res) => {
  const { expenseID, payiID } = req.params;
  console.log(expenseID);
  console.log(payiID);
  try {
    let bill = await BillModel.findById(expenseID);

    bill.owe.forEach(async (user) => {
      if (JSON.stringify(user.payi_id) === JSON.stringify(payiID)) {
        const cuser = await UserModel.findById(payiID);
        cuser.owe = Number(cuser.owe) - Number(user.due_amount);
        user.isPaid = true;
        user.due_amount = 0;
        bill.paid.push(user.payi_id);
        await bill.save();
        await cuser.save();
      }
    });

    res.json({
      status: true,
      msg: "Bill Paid",
      bill,
    });
  } catch (error) {
    return res.json({
      status: false,
      msg: error.message,
    });
  }
};

const getBill = async (req, res) => {
  const { expenseID } = req.params;

  try {
    const oweUsers = await BillModel.findById(expenseID).populate("paid");
    console.log(oweUsers);
    res.json({
      status: true,
      oweUsers,
    });
  } catch (error) {
    res.json({
      status: false,
      msg: error.message,
    });
  }
};

export { setBill, payBill, getBill };
