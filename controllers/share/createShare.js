const shareModel = require("../../models/share/shareModel");

const create = async (req, res) => {
  const { shareSymbol, shareName, companyName, shareTotalQty, shareUnitPrice } =
    req.body;

  const shareCreate = new shareModel({
    shareSymbol,
    shareName,
    companyName,
    shareTotalQty,
    shareRemainingQty: shareTotalQty,
    shareUnitPrice,
    shareTotalPrice: shareUnitPrice * shareTotalQty,
    expirationDate: new Date(new Date().getTime() + 1000 * 60 * 60),
  });
  //share model in share symbol control.
  shareModel.findOne(
    { shareSymbol: shareSymbol },
    async (errResult, findResult) => {
      if (findResult) {
        res.status(400).json({ message: "Share already exist!" });
      } else {
          //new share save in db.
        await shareCreate.save((err, result) => {
          if (err) {
            res
              .status(400)
              .json({ message: "Failed to create share!", error: err });
          } else {
            res.status(200).json({
              response: "The operation is successful.Share registered.",
              result: result,
            });
          }
        });
      }
    }
  );
};
module.exports = { create };
