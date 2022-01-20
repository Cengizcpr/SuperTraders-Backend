const express = require("express");
const shareRouter = express.Router();

const buyShare = require('../controllers/shareMarket/buyShare');
const sallerShare = require('../controllers/shareMarket/sallerShare');
const sallerGet = require('../controllers/shareMarket/sallerGet');

shareRouter.post('/buyShare',buyShare.buy)
shareRouter.post('/sallerShare',sallerShare.saller)
shareRouter.get('/sallerGet',sallerGet.saller)

module.exports = shareRouter;
