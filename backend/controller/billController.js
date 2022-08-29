import UserModel from "../Models/UserModel.js";
import GroupModel from "../Models/GroupModel.js";
import BillModel from "../Models/BillModel.js";

const setBill = async (req, res) => {
  const { amount, payi, payi_id, due_amount } = req.body;
  const { groupID } = req.params;

  if (!groupID || !amount || !payi || !payi_id || !due_amount) {
    return res.json({
      status: false,
      msg: "All Fields Required....",
    });
  }

  const otherpayi = [
    {
      payi_id,
      due_amount,
    },
  ];

  try {
    const isGroup = await GroupModel.findById(groupID);
    if (!isGroup) {
      return res.json({
        status: false,
        msg: "Invalid Group...",
      });
    }

    const isPayi = await UserModel.findById(payi);
    if (!isPayi) {
      return res.json({
        status: false,
        msg: "Invalid Group...",
      });
    }
    let bill = {
      amount,
      payi,
      otherpayi,
    };

    bill = await new BillModel(bill);
    bill.save();

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
