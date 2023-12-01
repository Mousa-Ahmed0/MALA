const router=require("express").Router();
const { addPayment, getPayment, countPayment, getPaymentIdentPatient, getByDate, getFromToDate, test } = require("../Controller/payments.Controller");
const validateObjectId = require("../middlewares/validateObjectId");
const { verifyToken, ifAdminOrStaff } = require("../middlewares/verifyToken");
router.post('/addPayment',ifAdminOrStaff,addPayment);
router.get('/getPayment',ifAdminOrStaff,getPayment);
router.get('/countPayment',ifAdminOrStaff,countPayment);
router.get('/getPaymentIdentPatient',ifAdminOrStaff,getPaymentIdentPatient);
router.get('/getByDate',ifAdminOrStaff,getByDate);
router.get('/week',ifAdminOrStaff,test);//test 
router.get('/getFromToDate',ifAdminOrStaff,getFromToDate);
module.exports=router;