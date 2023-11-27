const router=require("express").Router();
const { addPayment } = require("../Controller/payments.Controller");
const validateObjectId = require("../middlewares/validateObjectId");
const { verifyToken, ifAdminOrStaff } = require("../middlewares/verifyToken");
router.post('/addPayment',ifAdminOrStaff,addPayment);
module.exports=router;