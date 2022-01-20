const express = require("express");
const customerRouter = express.Router();

const createCustomer = require("../controllers/customer/createCustomer");
const getCustomer = require("../controllers/customer/getCustomer");

customerRouter.post("/createCustomer", createCustomer.create);
customerRouter.get("/getCustomer", getCustomer.list);

module.exports = customerRouter;
