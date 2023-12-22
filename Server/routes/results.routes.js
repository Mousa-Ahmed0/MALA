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
  isDone,
  isPaied,
  isDoneEdit,
  isPaiedEdit,
  getAllResultsById,
} = require("../Controller/results.Controller");

// results
router.post("/addResults", ifAdminOrStaff, addResults);
router.get("/getResult", ifAdminOrStaff, getResults);
router.get("/getResults/staffIdent", ifAdminOrStaff, getResultsByIdStaff);
router.get("/getResults/resultDate", ifAdminOrStaff, resultDate);
router.get("/getResults/resultDateFromTo", ifAdminOrStaff, resultDateFromTo);
router.get("/getResults/dayResult", ifAdminOrStaff, dayResult);

router.get("/getResults/:id", validateId, getResultsById);
router.get("/getAllResults/:id", validateId, getAllResultsById);
router.get("/getPatientAnalyze", getResultsPatient);
router.get("/getDoctorAnzlyze", ifAdminOrStaff, getResultsDoctor);
router.get("/getStaffAnzlyze", ifAdminOrStaff, getResultsStaff);
router.get("/Results/ifDone", ifAdminOrStaff, isDone);
router.put("/Results/isDoneEdit/:id",validateId, ifAdminOrStaff, isDoneEdit);
router.get("/Results/ifPaied", ifAdminOrStaff, isPaied);
router.put("/Results/ifPaiedEdit/:id",validateId, ifAdminOrStaff, isPaiedEdit);
module.exports = router;
