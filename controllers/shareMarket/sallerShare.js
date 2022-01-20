const { buyersModel } = require("../../functions/modelFind");
const sallersModel = require("../../models/sallers/sallersModel");
const saller = async (req, res) => {
  const { shareSymbol, shareQty, customerUsername } = req.body;
  var totalSallerShareQty = 0;
  const customerData = await buyersModel(customerUsername);
  if (customerData) {
    if (customerData.shareQty > shareQty)
      totalSallerShareQty = customerData.shareQty;
    else totalSallerShareQty = shareQty;

    sallersModel.updateOne(
      { customerUsername: customerUsername },
      {
        shareSymbol: shareSymbol,
        shareQty: totalSallerShareQty,
      },
      (errUpdBuy, resultUpdt) => {
        if (resultUpdt.modifiedCount == 0) {
          const createNewsallers = new sallersModel({
            shareSymbol: shareSymbol,
            shareQty: shareQty,
            customerUsername: customerUsername,
          });
          createNewsallers.save();
          res.status(200).json({
            response: `The share can now be sold.Sallers ${totalSallerShareQty}`,
          });
        } else {
          res.status(200).json({
            response: `Sallers update`,
          });
        }
      }
    );
  } else {
    res.status(400).json({ message: "Such a Customer is not registered!" }); // not customer
  }
};
module.exports = { saller };
