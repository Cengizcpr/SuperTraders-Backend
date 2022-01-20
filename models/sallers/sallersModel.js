const mongoose = require("mongoose");

const sallerSchema = new mongoose.Schema({
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

module.exports = mongoose.model("saller", sallerSchema);
