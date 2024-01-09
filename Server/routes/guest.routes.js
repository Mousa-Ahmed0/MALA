const { addGuestMessage, getGuestMeassage, deleeteGuestMeassage, sendEmail, countIfRead } = require("../Controller/guest.Controller");
const validateObjectId = require('../middlewares/validateObjectId');
const { ifAdminOrStaff } = require("../middlewares/verifyToken");

const router = require("express").Router();

router.route("/addGuestMeassage").post(addGuestMessage);
router.route("/sendEmail").post(ifAdminOrStaff,sendEmail);
router.get("/getGuestMeassage",ifAdminOrStaff, getGuestMeassage);
router.get("/countIfRead",ifAdminOrStaff, countIfRead);
router.delete("/deleteGuestMeassage/:id",validateObjectId, ifAdminOrStaff,deleeteGuestMeassage);


module.exports = router;
