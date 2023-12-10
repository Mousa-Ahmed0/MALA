const {
    ifAdmin,
    verifyTokenOnlyUser,
    verifyToken,
    verifyTokenOnlyUserOrAdmin,
    ifAdminOrStaff,
} = require("../middlewares/verifyToken");
const validateId = require("../middlewares/validateObjectId");
const photoUpload = require("../middlewares/photoUpload");
const { advertisements, PhotoUpload, getAdvert, updateAdverti } = require("../Controller/advertisements.Controller");
const router = require("express").Router();
router.put("/updateAdverti", ifAdmin,photoUpload.array("images",10), updateAdverti);

router.post("/addAdvert", ifAdmin, advertisements);
router.get("/getAdvertis", ifAdmin, getAdvert);
router
  .route("/addPhoto")
  .post(ifAdmin, photoUpload.array("images",10), PhotoUpload);


module.exports = router; 
