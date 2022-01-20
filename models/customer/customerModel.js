const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  customerNameSurname: {
    type: String,
  },
  customerUsername: {
    type: String,
  },
  totalBudget: {
    type: Number,
  },
  remainingBudget: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("customer", customerSchema);
