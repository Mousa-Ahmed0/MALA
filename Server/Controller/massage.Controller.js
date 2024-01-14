const asyncHandler = require("express-async-handler");
const { Massage, vaildationMessage } = require("../models/message");
const mongoose = require("mongoose");

/**--------------------------------
 * @desc Send Massage
 * @router /api/massage/sendMassage
 * @method POST
 * @access public
 * ------------------------------------------ */
module.exports.sendMass = asyncHandler(async (req, res) => {
  try {
    //if Patient must be determain admin _id
    let objectIdString = "659928039f6a2dee27595dcc";
    console.log(objectIdString);

    if (req.user.usertype === "Patient" || req.user.usertype === "Doctor")
      objectIdString = process.env.ADMIN_ID;
    else objectIdString = req.body.secondUser;    //admin _id - 659928039f6a2dee27595dcc
    // Validate if objectIdString is a valid ObjectId
    // if (!mongoose.Types.ObjectId.isValid(objectIdString)) {
    //   console.log(objectIdString);
    //   return res.status(400).json({ message: "Invalid ID" });
    // }
    const { error } = vaildationMessage(req.body);
    // validation
    if (error) {
      let mesError = [];
      error.details.map((index) => {
        mesError.push(index.message);
      })
      return res.status(400).json({ message: mesError });
    }
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
      // After saving the message, emit a socket event
      // io.to(objectIdString).emit("newMessage", massRecord);
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
      await newMass.save();
      console.log(newMass.secondUser);
      // io.to(objectIdString).emit("newMessage", massRecord);

      return res.status(200).json(newMass);
    }
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    res.status(500).json({ errorMess: "Internal Server Error",error });
  }
});
/**--------------------------------
 * @desc get all Massage
 * @router /api/massage/getAllMassage/
 * @method GET
 * @access public
 * ------------------------------------------ */
module.exports.getAllMass = asyncHandler(async (req, res) => {
  try {
    const POST_PER_PAGE = 10;
    const pageNumber = req.query.pageNumber;
    const newMass = await Massage.find({})
      .skip((pageNumber - 1) * POST_PER_PAGE)
      .limit(POST_PER_PAGE)
      .sort({ createdAt: -1 })
      .populate("firstUser", ["-password"])
      .populate("secondUser", ["-password"]);
    //.populate('secondUser', ['-password'])
    if (newMass) {
      const count = await Massage.find({}).count();

      return res.status(200).json({ newMass, count });
    } else return res.status(400).json({ massage: "Massage dose not exist" });
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    res.status(500).json({ errorMess: "Internal Server Error",error });
  }
});

/**--------------------------------
 * @desc get Massage
 * @router /api/massage/getMassage/
 * @method GET
 * @access public
 * ------------------------------------------ */
module.exports.getMass = asyncHandler(async (req, res) => {
  try {
    const newMass = await Massage.find({ firstUser: req.user.id })
      .populate("firstUser", ["-password"])
      .sort({ createdAt: 1 });
    //.populate('secondUser', ['-password'])
    if (newMass) return res.status(200).json(newMass);
    else return res.status(400).json({ massage: "Massage dose not exist" });
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    res.status(500).json({ errorMess: "Internal Server Error",error });
  }
});
/**--------------------------------
 * @desc get Massage
 * @router /api/massage/getUserMassage/:id
 * @method GET
 * @access public
 * ------------------------------------------ */
module.exports.getUserMass = asyncHandler(async (req, res) => {
  try {
    const newMass = await Massage.findById(req.params.id)
      .populate("secondUser", ["-password"])
      .populate("firstUser", ["-password"]);
    //.populate('secondUser', ['-password'])
    if (newMass) {
      if (newMass.firstUser && newMass.firstUser.equals(req.user.id)) {
        newMass.ifReadyFirstUser = true;
        await newMass.save();
      } else if (newMass.secondUser && newMass.secondUser.equals(req.user.id)) {
        newMass.ifReadySecondUser = true;
        await newMass.save();
      }
      return res.status(200).json(newMass);
    } else return res.status(400).json({ massage: "Massage dose not exist" });
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    res.status(500).json({ errorMess: "Internal Server Error",error });
  }
});

/**--------------------------------
 * @desc delete Massage
 * @router /api/massage/deleteMassage/:id
 * @method DELETE
 * @access public
 * ------------------------------------------ */
module.exports.deleteMass = asyncHandler(async (req, res) => {
  try {
    const newMass = await Massage.findByIdAndDelete(req.params.id);
    if (!newMass) return res.status(404).json({ message: "Massage not found" });
    else return res.status(200).json({ message: "Massage is delete..." });
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    res.status(500).json({ errorMess: "Internal Server Error",error });
  }
});

/**--------------------------------
 * @desc return .count if not read
 * @router /api/massage/countRead
 * @method GET
 * @access public
 * ------------------------------------------ */
module.exports.countIfRead = asyncHandler(async (req, res) => {
  try {
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
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    res.status(500).json({ errorMess: "Internal Server Error",error });
  }
});
/**--------------------------------
 * @desc Edit if ready
 * @router /api/massage/ifReady/:id
 * @method GET
 * @access public
 * ------------------------------------------ */
module.exports.editIfReady = asyncHandler(async (req, res) => {
  try {
    const updateReady = await Massage.findById(req.params.id);
    if (!updateReady)
      return res.status(404).json({ error: "Massage not found" });
    else if (updateReady.firstUser == req.user.id) {
      updateReady.ifReadyFirstUser = true;
      await updateReady.save();
      return res.status(200).json({ edit: true, updateReady });
    } else if (updateReady.secondUser == req.user.id) {
      updateReady.ifReadySecondUser = true;
      await updateReady.save();
      return res.status(200).json({ edit: true, updateReady });
    }
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    res.status(500).json({ errorMess: "Internal Server Error",error });
  }
});
