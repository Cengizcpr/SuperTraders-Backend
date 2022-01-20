const shareModel = require("../models/share/shareModel");
const customerModel = require("../models/customer/customerModel");
const buyersModel = require("../models/buyers/buyersModel");

exports.modelUpdateCustomer = async (
  customerUsername,
  shareSymbol,
  buyShareResult,
  remainingBudget
) => {
  customerModel.updateOne(
    { customerUsername: customerUsername },
    {
      remainingBudget: remainingBudget,
    },
    (errUpd, resultUpdt) => {
      if (errUpd) {
        return false;
      } else {
        buyersModel.updateOne(
          { customerUsername: customerUsername },
          {
            shareSymbol: shareSymbol,
            shareQty: buyShareResult,
          },
          (errUpdBuy, resultUpdt) => {
            if (resultUpdt.modifiedCount == 0) {
              const createNewCustomerShare = new buyersModel({
                shareSymbol: shareSymbol,
                shareQty: buyShareResult,
                customerUsername: customerUsername,
              });
              createNewCustomerShare.save();
              return true;
            } else {
              return true;
            }
          }
        );
      }
    }
  );
};
exports.modelUpdateShare = async (shareSymbol, buyShareResult) => {
  let data = await shareModel.findOne({ shareSymbol });

  shareModel.updateOne(
    {
      shareSymbol: shareSymbol,
    },
    { shareRemainingQty: data.shareRemainingQty - buyShareResult },
    (errUpd, resultUpdt) => {
      if (errUpd) {
        return false;
      } else {
        return true;
      }
    }
  );
};
