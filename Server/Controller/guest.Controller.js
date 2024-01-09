const asyncHandler = require("express-async-handler");
const { Guest } = require("../models/guest");
const { sendEmail } = require("../utils/Email/user.Email");

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
    const allMeass = await Guest.find({}).sort({ createdAt: 1 });;

    if (allMeass.length) {
        for (const index of allMeass) {
            index.ifReady = true;
            await index.save();
        }
        res.status(200).json({ allMeass, message: "done..........." });
    }
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
        res.status(200).json({ message: " Delete done..........." });
    else
        res.status(404).json({ message: "User not found" });
});
/**--------------------------------
 * @desc count if not read
 * @router /api/Guest/countIfRead
 * @method GET
 * @access  (staff or admin)
 * ------------------------------------------ */
module.exports.countIfRead = asyncHandler(async (req, res) => {
    const Meass = await Guest.findOneAndDelete({ ifReady: false }).count();
    if (Meass) {
        res.status(200).json({ "count": Meass});
    } else
        res.status(404).json({ message: "All of massge is reade" ,Meass});
});


/**--------------------------------
 * @desc send Email
 * @router /api/Guest/sendEmail
 * @method post
 * @access  (staff or admin)
 * ------------------------------------------ */

module.exports.sendEmail = asyncHandler(async (req, res) => {
    try {
        const email = req.body.email;
        const subject = req.body.subject;
        const massage = req.body.massage;

        // Assuming sendEmail is an asynchronous function that can throw errors
        await sendEmail({ email, massage, subject });
        res.status(200).json({ message: "Send massage" });
    } catch (error) {
        // Handle the error here, you can log it or send a specific error response to the client
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
