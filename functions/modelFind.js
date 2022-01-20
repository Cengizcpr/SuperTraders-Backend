const shareModel = require("../models/share/shareModel");
const customerModel = require('../models/customer/customerModel');
const buyersModel = require('../models/buyers/buyersModel');

exports.shareFind = async (shareSymbol) => {

  const shareData =await  shareModel.findOne({ shareSymbol });
  if (shareData) return shareData;
  else return null;
};

exports.customerFind = (customerUsername) => {
  const result =  customerModel.findOne({ customerUsername });
  if (result) return result;
  else return null;
};

exports.buyersModel = (customerUsername) => {
  const result =  buyersModel.findOne({ customerUsername });
  if (result) return result;
  else return null;
};
