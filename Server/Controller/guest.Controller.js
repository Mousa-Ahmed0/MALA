const asyncHandler = require("express-async-handler");
const { Guest } = require("../models/guest");

/**--------------------------------
 * @desc add Guest meassage
 * @router /api/Guest/addGuestMeassage
 * @method post
 * @access  (staff or admin)
 * ------------------------------------------ */
module.exports.addGuestMessage = asyncHandler(async (req, res) => {
    const newGuest = new Guest({
        fullName: req.body.fullName,
        email: req.body.email,
        message: req.body.message,
    });
    await newGuest.save();
    //send a response to client
    res.status(201).json({ newGuest, message: "done..........." });
});

/**--------------------------------
 * @desc get All Guest meassage
 * @router /api/Guest/getGuestMeassage
 * @method GET
 * @access  (staff or admin)
 * ------------------------------------------ */
module.exports.getGuestMeassage = asyncHandler(async (req, res) => {
    const allMeass = await Guest.find({});
    if (allMeass.length)
        res.status(200).json({ allMeass, message: "done..........." });
    else
        res.status(404).json({ message: "User not found" });
})

/**--------------------------------
 * @desc delete Guest meassage
 * @router /api/Guest/deleteGuestMeassage/:id
 * @method DELETE
 * @access  (staff or admin)
 * ------------------------------------------ */
module.exports.deleeteGuestMeassage = asyncHandler(async (req, res) => {
    const delMeass = await Guest.findByIdAndDelete(req.params.id);
    if (delMeass)
        res.status(200).json({  message: " Delete done..........." });
    else
        res.status(404).json({ message: "User not found" });
})