const {
  ifAdmin,
  verifyTokenOnlyUser,
  verifyToken,
  verifyTokenOnlyUserOrAdmin,
  ifAdminOrStaff,
} = require("../middlewares/verifyToken");
const validateId = require("../middlewares/validateObjectId");
const photoUpload = require("../middlewares/photoUpload");
const {  getAdvert, updateAdverti, deleteAdvert, addAdvert, getAdvertId } = require("../Controller/advertisements.Controller");
const router = require("express").Router();

router.get("/getAdvertisId/:id", ifAdmin, getAdvertId);
router.delete("/deleteAdvert/:id", ifAdmin, deleteAdvert);
router.get("/getAdvertis", ifAdmin, getAdvert);
router
  .route("/addAdvert")
  .post(ifAdmin, photoUpload.array("images", 10), addAdvert);
router.put("/updateAdverti/:id", validateId, ifAdmin, photoUpload.array("images", 10), updateAdverti);


module.exports = router; 
