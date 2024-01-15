const router = require("express").Router();
const {
  addPayment,
  getPayment,
  countPayment,
  getPaymentIdentPatient,
  getByDate,
  getFromToDate,
  test,
  getPaymentId,
  getAllPayments,
} = require("../Controller/payments.Controller");
const validateObjectId = require("../middlewares/validateObjectId");
const { verifyToken, ifAdminOrStaff } = require("../middlewares/verifyToken");
router.post("/addPayment", ifAdminOrStaff, addPayment);
router.get("/getPayment", ifAdminOrStaff, getPayment);
router.get("/getAllPayments", ifAdminOrStaff, getAllPayments);
router.get("/countPayment", ifAdminOrStaff, countPayment);
router.get("/getPaymentIdentPatient", getPaymentIdentPatient);
router.get("/getByDate", ifAdminOrStaff, getByDate);
router.get("/week", test); //test
router.get("/getFromToDate", getFromToDate);
router.get("/getPaymentId/:id", validateObjectId, ifAdminOrStaff, getPaymentId);
module.exports = router;
