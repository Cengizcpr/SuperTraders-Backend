const sallersModel = require("../../models/sallers/sallersModel");
const saller = async (req, res) => {

 const result = await sallersModel.find()
    res.status(200).json({response:result})
};
module.exports = { saller };
