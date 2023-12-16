const router = require("express").Router();

const { sendMass, getMass, deleteMass } = require("../Controller/massage.Controller");
const validateObjectId = require("../middlewares/validateObjectId");
const { verifyToken } = require("../middlewares/verifyToken");

router.post("/sendMassage",verifyToken, sendMass); 
router.delete("/deleteMassage/:id",validateObjectId,verifyToken, deleteMass); 
router.get("/getMassage/:id",validateObjectId,verifyToken, getMass); 

module.exports = router;
