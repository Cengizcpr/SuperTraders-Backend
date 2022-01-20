const customerModel = require("../../models/customer/customerModel");

const create = async (req, res) => {
  const { customerNameSurname, customerUsername, totalBudget } = req.body;

  const customerCreate = new customerModel({
    customerNameSurname,
    customerUsername,
    totalBudget,
    remainingBudget: totalBudget,
  });
  //customer model in same customer control.
  customerModel.findOne(
    { customerUsername: customerUsername },
    async (errResult, findResult) => {
      if (findResult) {
        res.status(400).json({ message: "Such a customer already exists!" });
      } else {
        //new customer save in db.
        await customerCreate.save((err, result) => {
          if (err) {
            res
              .status(400)
              .json({ message: "Failed to create customer!", error: err });
          } else {
            res.status(200).json({
              response: "New customer registered.",
              result: result,
            });
          }
        });
      }
    }
  );
};
module.exports = { create };
