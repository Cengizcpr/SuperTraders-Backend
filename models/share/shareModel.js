const mongoose = require("mongoose");

const shareSchema = new mongoose.Schema({
  shareSymbol: {
    type: String,
  },
  shareName: {
    type: String,
  },
  companyName: {
    type: String,
  },
  shareTotalQty: {
    type: Number,
  },
  shareRemainingQty:{
    type: Number,
  },
  shareUnitPrice: {
    type: Number,
  },
  shareTotalPrice: {
    type: Number,
  },
  expirationDate: {
    type: Date,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("share", shareSchema);
