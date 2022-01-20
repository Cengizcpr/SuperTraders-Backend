const mongoose = require("mongoose");

const buySchema = new mongoose.Schema({
  customerUsername: {
    type: String,
  },
  shareSymbol: {
    type: String,
  },
  shareQty: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("buy", buySchema);
