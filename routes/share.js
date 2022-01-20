const express = require("express");
const shareRouter = express.Router();

const createShare = require('../controllers/share/createShare');
const getShare= require('../controllers/share/getShare');
const updateShare= require('../controllers/share/updateShare');
const validation = require('../middleware/validShare');
shareRouter.post('/createShare',validation.symbol,createShare.create)
shareRouter.get('/getShare',getShare.list)
shareRouter.put('/updateShare',updateShare.update)

module.exports = shareRouter;
