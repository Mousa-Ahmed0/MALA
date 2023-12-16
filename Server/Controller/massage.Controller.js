const asyncHandler = require("express-async-handler");
const {Massage} = require("../models/message");
/**--------------------------------
 * @desc Send Massage
 * @router /api/massage/sendMassage
 * @method POST
 * @access public
 * ------------------------------------------ */
module.exports.sendMass = asyncHandler(async (req, res) => {
    console.log(req.user.id);
    const newMass=new Massage({
        userId:req.user.id,
        massage:req.body.massage,
    });
    await newMass.save();
    res.status(200).json(newMass); 

});
/**--------------------------------
 * @desc get Massage
 * @router /api/massage/getMassage
 * @method GET
 * @access public
 * ------------------------------------------ */
module.exports.getMass = asyncHandler(async (req, res) => {
    console.log(req.user.id);
    const newMass=await Massage.find().populate('userId',['-password']).sort({ createdAt: -1 });

    res.status(200).json(newMass); 

});