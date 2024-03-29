const {
  ifAdmin,
  verifyTokenOnlyUser,
  verifyToken,
  verifyTokenOnlyUserOrAdmin,
  ifAdminOrStaff,
  ifDoctor,
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
  editResult,
  isDoneCount,
  isPaiedCount,
  pythonResults,
  imageDeletResutl,
} = require("../Controller/results.Controller");

// results
router.post("/addResults", ifAdminOrStaff, addResults);
router.put("/editResults/:id", ifAdminOrStaff, editResult);
router.get("/getResult", ifAdminOrStaff, getResults);
router.get("/getResults/staffIdent", ifAdminOrStaff, getResultsByIdStaff);
router.get("/getResults/resultDate", ifAdminOrStaff, resultDate);
router.get("/getResults/resultDateFromTo", ifAdminOrStaff, resultDateFromTo);
router.get("/getResults/dayResult", ifAdminOrStaff, dayResult);
router.get("/getResults/ifDoneCount", ifAdminOrStaff, isDoneCount);
router.get("/getResults/ifPaiedCount", ifAdminOrStaff, isPaiedCount);
router.delete("/getResults/imageDeletResutl", ifDoctor, imageDeletResutl);
router.get(
  "/getResults/pythonResults/:id",
  validateId,
  ifDoctor,
  pythonResults
);

router.get("/getResults/:id", validateId, getResultsById);
router.get("/getAllResults/:id", validateId, getAllResultsById);
router.get("/getPatientAnalyze", getResultsPatient);
router.get("/getDoctorAnzlyze", getResultsDoctor);
router.get("/getStaffAnzlyze", ifAdminOrStaff, getResultsStaff);
router.get("/Results/ifDone", ifAdminOrStaff, isDone);
router.put("/Results/isDoneEdit/:id", validateId, ifAdminOrStaff, isDoneEdit);
router.get("/Results/ifPaied", ifAdminOrStaff, isPaied);
router.put("/Results/ifPaiedEdit/:id", validateId, ifAdminOrStaff, isPaiedEdit);
module.exports = router;
