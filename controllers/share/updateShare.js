const shareModel = require("../../models/share/shareModel");

const update = async (req, res) => {
  const { shareSymbol, shareUnitPrice } = req.body;
  
//Model in share control.
  shareModel.findOne({ shareSymbol: shareSymbol }, (err, result) => {
    if (result) {
        //Time control required for update 
      if (new Date(result.expirationDate) > new Date()) {
        const objectShare = {
          shareUnitPrice: shareUnitPrice,
          shareTotalPrice: result.shareTotalQty * shareUnitPrice,
          date: new Date().getTime(),
          expirationDate: new Date(new Date().getTime() + 1000 * 60 * 60),
        };
        //Share model unit price update.
        shareModel.updateOne(
          { shareSymbol: shareSymbol },
          objectShare,
          (errUpdate) => {
            if (errUpdate) {
              res
                .status(400)
                .json({ message: "Failed to update share!", error: errUpdate });
            } else {
              res.status(200).json({
                response: "The operation is successful.Share updated.",
              });
            }
          }
        );
      } else {
        res.status(400).json({
          message: `You can update the value after ${
            new Date(result.expirationDate).getMinutes() -
            new Date().getMinutes()
          } minutes`,
        });
      }
    } else {
      res
        .status(400)
        .json({ message: "There are no shares registered with this symbol!" });
    }
  });
};
module.exports = { update };
