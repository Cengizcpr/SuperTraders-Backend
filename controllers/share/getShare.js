const shareModel = require("../../models/share/shareModel");

const list =  (req, res) => {
  const { shareSymbol } = req.body;
   shareModel.findOne({ shareSymbol: shareSymbol }, (err, result) => {
    if (result) {
      res.status(200).json({ response: result });
    } else {
      res
        .status(400)
        .json({ message: "There are no shares registered with this symbol!" });
    }
  });
};
module.exports = { list };
