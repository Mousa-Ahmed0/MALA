const router=require("express").Router();
const { addPayment, getPayment, countPayment, getPaymentIdentPatient } = require("../Controller/payments.Controller");
const validateObjectId = require("../middlewares/validateObjectId");
const { verifyToken, ifAdminOrStaff } = require("../middlewares/verifyToken");
router.post('/addPayment',ifAdminOrStaff,addPayment);
router.get('/getPayment',ifAdminOrStaff,getPayment);
router.get('/countPayment',ifAdminOrStaff,countPayment);
router.get('/getPaymentIdentPatient',ifAdminOrStaff,getPaymentIdentPatient);
module.exports=router;