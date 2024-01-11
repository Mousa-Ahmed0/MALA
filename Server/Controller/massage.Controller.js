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
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
server.listen(3005, () => {
  console.log('WebSocket server is running on port 3005');
});
/**--------------------------------
 * @desc Send Massage
 * @router /api/massage/sendMassage
 * @method POST
 * @access public
 * ------------------------------------------ */
module.exports.sendMass = asyncHandler(async (req, res) => {
  try {
    let objectIdString = "";
    if (req.user.usertype === "Patient") objectIdString = process.env.ADMIN_ID;
    else objectIdString = req.body.secondUser;

    let massRecord = await Massage.findOne({
      $or: [
        { firstUser: req.user.id, secondUser: objectIdString },
        { firstUser: objectIdString, secondUser: req.user.id },
      ],
    });

    const io = socketio(); // Replace with your actual socket.io initialization

    if (massRecord) {
      const indx = massRecord.massage;
      const last = indx[indx.length - 1];

      if (req.user.id == last.senderId) {
        if (req.user.id == massRecord.firstUser) {
          massRecord.ifReadyFirstUser = true;
          massRecord.ifReadySecondUser = false;
        } else if (req.user.id == massRecord.secondUser) {
          massRecord.ifReadyFirstUser = false;
          massRecord.ifReadySecondUser = true;
        }
      } else {
        if (req.user.id == massRecord.firstUser) {
          massRecord.ifReadyFirstUser = true;
          massRecord.ifReadySecondUser = false;
        } else if (req.user.id == massRecord.secondUser) {
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

      // Emit a message event to the relevant room (based on the users' IDs)
      io.to(req.user.id).to(objectIdString).emit('message', massRecord);

      return res.status(200).json(massRecord);
    } else {
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

      // Create a room for the two users and join them
      io.join(req.user.id);
      io.join(objectIdString);

      // Emit a message event to the relevant room
      io.to(req.user.id).to(objectIdString).emit('message', newMass);

      return res.status(200).json(newMass);
    }
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
      // io.emit('allMessages', newMass); // Emit all messages to all connected clients
      const count = await Massage.find({}).count();

      return res.status(200).json({ newMass, count });
    } else return res.status(400).json({ massage: "Massage dose not exist" });
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
