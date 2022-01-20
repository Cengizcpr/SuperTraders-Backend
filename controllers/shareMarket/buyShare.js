const { shareFind, customerFind } = require("../../functions/modelFind");
const { modelUpdateCustomer,modelUpdateShare } = require("../../functions/modelUpdate");

const buy = async (req, res) => {
  const { shareSymbol, shareBuyQtyCustomer, customerUsername } = req.body;
  let shareRemainingQty,
    shareUnitPrice,
    remainingBudget,
    buyShareResult = 0;
  const shareData = await shareFind(shareSymbol);
  if (shareData) {
    shareRemainingQty = shareData.shareRemainingQty;
    shareUnitPrice = shareData.shareUnitPrice;
    const customerData = await customerFind(customerUsername);
    if (customerData) {
      remainingBudget = customerData.remainingBudget;
      if (shareRemainingQty > 0) {
        for (var i = 1; i < shareBuyQtyCustomer; i++) {
          if (remainingBudget >= shareUnitPrice) {
            buyShareResult++;//purchased shares qty
            remainingBudget -= shareUnitPrice;
          }
        }
        if (buyShareResult > 0) {
          //update
          const customerData =  modelUpdateCustomer(
            customerUsername,
            shareSymbol,
            buyShareResult,
            remainingBudget
          );
          if (customerData){
            modelUpdateShare(shareSymbol,buyShareResult);
            
            res.status(200).json({
              response: `The purchase has been made.Quantity purchased ${buyShareResult}--->Remaining budget ${remainingBudget} `,
            });//purchase successful message , Remaining budget info, Quantity purchased  info
          }


          else
            res
              .status(400)
              .json({ message: "Failed to update !" }); // custome - >when making a purchase  update faild error 
        } else {
          res.status(400).json({
            message: `You could not make any purchases. Remaining budget ${remainingBudget}`,
          }); //remainin budget < share unit price

        }
      } else {
        res.status(400).json({ message: "No shares available to buy!" });//Share Remaining Qty < 0 error message
      }
    } else {
      res.status(400).json({ message: "Such a Customer is not registered!" });// not customer 
    }
  } else {
    res
      .status(400)
      .json({ message: "There are no shares registered with this symbol!" });//not symbol
  }
};
module.exports = { buy };
