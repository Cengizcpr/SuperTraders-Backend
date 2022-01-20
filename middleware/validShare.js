
module.exports.symbol = (req,res,next)=> {
 const symbolValid = /^([a-zA-Z]{3})$/.test(req.body.shareSymbol)
 if(symbolValid) next()
 else res.status(400).json({message:"The symbol can only be three letters."})


};
