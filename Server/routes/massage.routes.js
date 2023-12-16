const router = require("express").Router();

const { sendMass, getMass } = require("../Controller/massage.Controller");
const validateObjectId = require("../middlewares/validateObjectId");
const { verifyToken } = require("../middlewares/verifyToken");

router.post("/sendMassage",verifyToken, sendMass); 
router.get("/getMassage",verifyToken, getMass); 

module.exports = router;
