const {
  ifAdmin,
  verifyTokenOnlyUser,
  verifyToken,
  verifyTokenOnlyUserOrAdmin,
  ifAdminOrStaff,
} = require("../middlewares/verifyToken");
const validateId = require("../middlewares/validateObjectId");
const photoUpload = require("../middlewares/photoUpload");
const {
  getAdvert,
  updateAdverti,
  deleteAdvert,
  addAdvert,
  getAdvertId,
  getAdvertisPages,
} = require("../Controller/advertisements.Controller");
const router = require("express").Router();

router.get("/getAdvertisId/:id", verifyToken, getAdvertId);
router.delete("/deleteAdvert/:id", ifAdmin, deleteAdvert);
router.get("/getAdvertis", verifyToken, getAdvert);
router.get("/getAdvertisPages", verifyToken, getAdvertisPages);
router
  .route("/addAdvert")
  .post(ifAdmin, photoUpload.array("images", 10), addAdvert);
router.put(
  "/updateAdverti/:id",
  validateId,
  ifAdmin,
  photoUpload.array("images", 10),
  updateAdverti
);

module.exports = router;
