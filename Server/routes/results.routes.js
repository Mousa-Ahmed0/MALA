const {
    ifAdmin,
    verifyTokenOnlyUser,
    verifyToken,
    verifyTokenOnlyUserOrAdmin,
    ifAdminOrStaff,
} = require("../middlewares/verifyToken");

const validateId = require("../middlewares/validateObjectId");
const router = require("express").Router();
const { addResults, getResults, getResultsPatient, getResultsDoctor, getResultsStaff, getResultsById, getResultsByIdStaff } = require("../Controller/results.Controller");



// results
router.post("/addResults", ifAdminOrStaff, addResults);
router.get("/getResult", ifAdminOrStaff, getResults);
router.get("/getResults/staffIdent",ifAdminOrStaff, getResultsByIdStaff);

router.get("/getResults/:id", validateId,ifAdminOrStaff, getResultsById);
router.get("/getPatientAnalyze", ifAdminOrStaff, getResultsPatient);
router.get("/getDoctorAnzlyze", ifAdminOrStaff, getResultsDoctor);
router.get("/getStaffAnzlyze", ifAdminOrStaff, getResultsStaff);
module.exports = router;
  