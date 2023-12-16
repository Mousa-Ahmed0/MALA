const asyncHandler = require("express-async-handler");
const { Massage } = require("../models/message");
/**--------------------------------
 * @desc Send Massage
 * @router /api/massage/sendMassage
 * @method POST
 * @access public
 * ------------------------------------------ */
module.exports.sendMass = asyncHandler(async (req, res) => {
    let newMass = await Massage.findOne({ userId: req.user.id });
    if (newMass) {    //if exist
        // Massage record exists, update it
        newMass.massage.push({
            mass: req.body.massage,
            date: new Date()
        });
        newMass.ifReady = false;
        await newMass.save();
        return res.status(200).json(newMass);
    }
    else {//first massage
        console.log(req.user.id);
        const newMass = new Massage({
            userId: req.user.id,
            massage: [{
                mass: req.body.massage,
                date: new Date()
            }],
            ifReady: false
        });
        await newMass.save();
        return res.status(200).json(newMass);
    }

    return res.status(400).json({ massage: "Massage not send" });

});
/**--------------------------------
 * @desc get Massage
 * @router /api/massage/getMassage/:id
 * @method GET
 * @access public
 * ------------------------------------------ */
module.exports.getMass = asyncHandler(async (req, res) => {
    const newMass = await Massage.findById(req.params.id).populate('userId', ['-password']).sort({ createdAt: 1 });
    if (newMass)
        return res.status(200).json(newMass);
    else
        return res.status(400).json({ massage: "Massage dose not exist" });

});

/**--------------------------------
 * @desc delete Massage
 * @router /api/massage/deleteMassage/:id
 * @method DELETE
 * @access public
 * ------------------------------------------ */
module.exports.deleteMass = asyncHandler(async (req, res) => {
    const newMass = await Massage.findById(req.params.id);
    if (!newMass)
        return res.status(404).json({ message: "Massage not found" });
    else {
        await newMass.deleteOne();
        return res.status(200).json({ message: "Massage is delete..." });
    }
});