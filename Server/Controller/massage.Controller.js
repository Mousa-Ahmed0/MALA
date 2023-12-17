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
    console.log(req.user.usertype)

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
        let objectIdString = ""
        if (req.user.usertype === "Patient")
            objectIdString = process.env.ADMIN_ID; //admin _id
        else
            objectIdString = req.body.recvId;

        const newMass = new Massage({
            userId: req.user.id,
            recvId: objectIdString,
            massage: [{
                mass: req.body.massage,
                date: new Date()
            }],
            ifReady: false
        });
        await newMass.save();
        console.log(newMass.recvId);
        return res.status(200).json(newMass);
    }
});
/**--------------------------------
 * @desc get Massage
 * @router /api/massage/getMassage/:id
 * @method GET
 * @access public
 * ------------------------------------------ */
module.exports.getMass = asyncHandler(async (req, res) => {
    const newMass = await Massage.findById(req.params.id).populate('userId', ['-password']).sort({ createdAt: 1 });
    //.populate('recvId', ['-password'])
    console.log(newMass.recvId);
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
    const newMass = await Massage.findByIdAndDelete(req.params.id);
    if (!newMass)
        return res.status(404).json({ message: "Massage not found" });
    else
        return res.status(200).json({ message: "Massage is delete..." });

});

/**--------------------------------
 * @desc return .count if not read
 * @router /api/massage/countRead
 * @method GET
 * @access public
 * ------------------------------------------ */
module.exports.countIfRead = asyncHandler(async (req, res) => {
    const newMass = await Massage.find({ ifReady: false }).count();
    if (!newMass)
        return res.status(404).json({ message: "All masage is ready", "count": newMass });
    else
        return res.status(200).json({ "Number of massage if not ready": newMass });

});
/**--------------------------------
 * @desc Edit if ready 
 * @router /api/massage/ifReady/:id
 * @method GET
 * @access public
 * ------------------------------------------ */
module.exports.editIfReady = asyncHandler(async (req, res) => {
    const edit = await Massage.findByIdAndUpdate(req.params.id, {
        ifReady: true,
    }, { new: true });
    if (edit)
        return res.status(200).json({ "edit": "true" });
    else
        return res.status(400).json({ "edit": "False" });

});