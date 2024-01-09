const asyncHandler = require("express-async-handler");
const { Massage } = require("../models/message");
const socketIO = require("socket.io");
// const http = require('http');
// const express = require('express');
// const { Server } = require("socket.io");

// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server);

// // Socket.io integration for sending/receiving messages
// io.on('connection', (socket) => {
//   console.log('A user connected');

//   // Handle disconnect event
//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });
// });

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
  //admin _id - 659928039f6a2dee27595dcc
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
    // io.emit('message', massRecord); // Emit a message to all connected clients
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
    // io.emit('message', newMass); // Emit a message to all connected clients
    console.log("message", newMass);

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
  const POST_PER_PAGE = 10;
  const pageNumber = req.query.pageNumber;
  const newMass = await Massage.find({})
    .populate("firstUser", ["-password"])
    .populate("secondUser", ["-password"])
    .skip((pageNumber - 1) * POST_PER_PAGE)
    .limit(POST_PER_PAGE)
    .sort({ createdAt: -1 });
  //.populate('secondUser', ['-password'])
  if (newMass) {
    // io.emit('allMessages', newMass); // Emit all messages to all connected clients
    const count = await Massage.find({}).count();

    return res.status(200).json(newMass, count);
  } else return res.status(400).json({ massage: "Massage dose not exist" });
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
