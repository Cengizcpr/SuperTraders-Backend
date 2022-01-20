const customerModel = require("../../models/customer/customerModel");
const buyersModel = require("../../models/buyers/buyersModel");
const sallersModel = require("../../models/sallers/sallersModel");

const list = (req, res) => {
  const { customerUsername } = req.body;
  customerModel.findOne(
    { customerUsername: customerUsername },
  async  (err, result) => {
      if (result) {
      let buyers=  await buyersModel.findOne({customerUsername: customerUsername})
      let sallers=  await sallersModel.findOne({customerUsername: customerUsername})

        res.status(200).json({ response: result,buyShares:[buyers],sallerShares:[sallers] });
      } else {
        res
          .status(400)
          .json({ message: "Such a Customer is not registered!!" });
      }
    }
  );
};
module.exports = { list };
