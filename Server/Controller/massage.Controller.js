const asyncHandler = require("express-async-handler");
const { Massage } = require("../models/message");
/**--------------------------------
 * @desc Send Massage
 * @router /api/massage/sendMassage
 * @method POST
 * @access public
 * ------------------------------------------ */
module.exports.sendMass = asyncHandler(async (req, res) => {
  //if Patient must be determain admin _id
  let objectIdString = "";
  if (req.user.usertype === "Patient") objectIdString = process.env.ADMIN_ID;
  //admin _id - 657061843f25f53b9f23d19c
  else objectIdString = req.body.secondUser;

  let massRecord = await Massage.findOne({
    $or: [
      { firstUser: req.user.id, secondUser: objectIdString },
      { firstUser: objectIdString, secondUser: req.user.id },
    ],
  });

  if (massRecord) {
    // Massage record exists, update it
    const indx = massRecord.massage;
    const last = indx[indx.length - 1];

    // const lastId=last.senderId.toString();

    if (req.user.id == last.senderId) {
      //last measage from same user
      if (req.user.id == massRecord.firstUser) {
        //firstUser
        massRecord.ifReadyFirstUser = true;
        massRecord.ifReadySecondUser = false;
      } else if (req.user.id == massRecord.secondUser) {
        //secondUser
        massRecord.ifReadyFirstUser = false;
        massRecord.ifReadySecondUser = true;
      }
    } else {
      //last measage from another user
      if (req.user.id == massRecord.firstUser) {
        //firstUser
        massRecord.ifReadyFirstUser = true;
        massRecord.ifReadySecondUser = false;
      } else if (req.user.id == massRecord.secondUser) {
        //secondUser
        massRecord.ifReadyFirstUser = false;
        massRecord.ifReadySecondUser = true;
      }
    }
    massRecord.massage.push({
      senderId: req.user.id,
      mass: req.body.massage,
      date: new Date(),
    });
    await massRecord.save();
    return res.status(200).json(massRecord);
  } else {
    // First massage
    const newMass = new Massage({
      firstUser: req.user.id,
      secondUser: objectIdString,
      massage: [
        {
          senderId: req.user.id,
          mass: req.body.massage,
          date: new Date(),
        },
      ],
      ifReadyFirstUser: true,
      ifReadySecondUser: false,
    });
    console.log(newMass.massage[0].senderId);
    await newMass.save();
    return res.status(200).json(newMass);
  }
});
/**--------------------------------
 * @desc get all Massage
 * @router /api/massage/getAllMassage/
 * @method GET
 * @access public
 * ------------------------------------------ */
module.exports.getAllMass = asyncHandler(async (req, res) => {
  const newMass = await Massage.find({})
    .populate("firstUser", ["-password"])
    .populate("secondUser", ["-password"])
    .sort({ createdAt: -1 });
  //.populate('secondUser', ['-password'])
  if (newMass) return res.status(200).json(newMass);
  else return res.status(400).json({ massage: "Massage dose not exist" });
});

/**--------------------------------
 * @desc get Massage
 * @router /api/massage/getMassage/
 * @method GET
 * @access public
 * ------------------------------------------ */
module.exports.getMass = asyncHandler(async (req, res) => {
  const newMass = await Massage.find({ firstUser: req.user.id })
    .populate("firstUser", ["-password"])
    .sort({ createdAt: 1 });
  //.populate('secondUser', ['-password'])
  if (newMass) return res.status(200).json(newMass);
  else return res.status(400).json({ massage: "Massage dose not exist" });
});
/**--------------------------------
 * @desc get Massage
 * @router /api/massage/getUserMassage/:id
 * @method GET
 * @access public
 * ------------------------------------------ */
module.exports.getUserMass = asyncHandler(async (req, res) => {
  const newMass = await Massage.findById(req.params.id)
    .populate("secondUser", ["-password"])
    .populate("firstUser", ["-password"])
    .sort({ createdAt: -1 });
  //.populate('secondUser', ['-password'])
  if (newMass) return res.status(200).json(newMass);
  else return res.status(400).json({ massage: "Massage dose not exist" });
});

/**--------------------------------
 * @desc delete Massage
 * @router /api/massage/deleteMassage/:id
 * @method DELETE
 * @access public
 * ------------------------------------------ */
module.exports.deleteMass = asyncHandler(async (req, res) => {
  const newMass = await Massage.findByIdAndDelete(req.params.id);
  if (!newMass) return res.status(404).json({ message: "Massage not found" });
  else return res.status(200).json({ message: "Massage is delete..." });
});

/**--------------------------------
 * @desc return .count if not read
 * @router /api/massage/countRead
 * @method GET
 * @access public
 * ------------------------------------------ */
module.exports.countIfRead = asyncHandler(async (req, res) => {
  const newMass = await Massage.find({
    $or: [
      { firstUser: req.user.id, ifReadyFirstUser: false },
      { secondUser: req.user.id, ifReadySecondUser: false },
    ],

  }).count();
  if (!newMass)
    return res
      .status(404)
      .json({ message: "All masage is ready", count: newMass });
  else return res.status(200).json({ No: newMass });
});
/**--------------------------------
 * @desc Edit if ready
 * @router /api/massage/ifReady/:id
 * @method GET
 * @access public
 * ------------------------------------------ */
module.exports.editIfReady = asyncHandler(async (req, res) => {
  const updateReady = await Massage.findById(req.params.id);
  if (!updateReady) return res.status(404).json({ error: "Massage not found" });
  else if (updateReady.firstUser == req.user.id) {
    updateReady.ifReadyFirstUser = true;
    await updateReady.save();
    return res.status(200).json({ edit: true, updateReady });
  } else if (updateReady.secondUser == req.user.id) {
    updateReady.ifReadySecondUser = true;
    await updateReady.save();
    return res.status(200).json({ edit: true, updateReady });
  }
});
