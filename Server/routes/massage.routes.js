const router = require("express").Router();

const {
  sendMass,
  getMass,
  deleteMass,
  countIfRead,
  editIfReady,
  getAllMass,
  getUserMass,
} = require("../Controller/massage.Controller");
const validateObjectId = require("../middlewares/validateObjectId");
const {
  verifyToken,
  ifAdmin,
  ifAdminOrStaff,
} = require("../middlewares/verifyToken");

router.post("/sendMassage", verifyToken, sendMass);
router.get("/countRead", ifAdminOrStaff, countIfRead);
router.get("/getAllMassage", ifAdminOrStaff, getAllMass);
router.put("/ifReady/:id", validateObjectId, verifyToken, editIfReady);
router.delete("/deleteMassage/:id", validateObjectId, verifyToken, deleteMass);
router.get("/getMassage", verifyToken, getMass);
router.get("/getUserMassage/:id", validateObjectId, verifyToken, getUserMass);

module.exports = router;
