const router = require("express").Router();

const { sendMass, getMass, deleteMass, countIfRead, editIfReady, getAllMass } = require("../Controller/massage.Controller");
const validateObjectId = require("../middlewares/validateObjectId");
const { verifyToken } = require("../middlewares/verifyToken");

router.post("/sendMassage",verifyToken, sendMass); 
router.get("/countRead",verifyToken, countIfRead); 
router.get("/getAllMassage",verifyToken, getAllMass); 
router.get("/ifReady/:id",verifyToken, editIfReady); 
router.delete("/deleteMassage/:id",validateObjectId,verifyToken, deleteMass); 
router.get("/getMassage",verifyToken, getMass); 

module.exports = router;
