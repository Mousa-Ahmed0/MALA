const {
  ifAdmin,
  verifyTokenOnlyUser,
  verifyToken,
  verifyTokenOnlyUserOrAdmin,
  ifAdminOrStaff,
} = require("../middlewares/verifyToken");

const validateId = require("../middlewares/validateObjectId");
const router = require("express").Router();
const {
  addResults,
  getResults,
  getResultsPatient,
  getResultsDoctor,
  getResultsStaff,
  getResultsById,
  getResultsByIdStaff,
  resultDate,
  resultDateFromTo,
  dayResult,
} = require("../Controller/results.Controller");

// results
router.post("/addResults", ifAdminOrStaff, addResults);
router.get("/getResult", ifAdminOrStaff, getResults);
router.get("/getResults/staffIdent", ifAdminOrStaff, getResultsByIdStaff);
router.get("/getResults/resultDate", ifAdminOrStaff, resultDate);
router.get("/getResults/resultDateFromTo", ifAdminOrStaff, resultDateFromTo);
router.get("/getResults/dayResult", ifAdminOrStaff, dayResult);

router.get("/getResults/:id", validateId, getResultsById);
router.get("/getPatientAnalyze", getResultsPatient);
router.get("/getDoctorAnzlyze", ifAdminOrStaff, getResultsDoctor);
router.get("/getStaffAnzlyze", ifAdminOrStaff, getResultsStaff);
module.exports = router;
