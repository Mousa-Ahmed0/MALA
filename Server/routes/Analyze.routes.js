const {
  addAnalyze,
  getAllAnalze,
  getAnalze,
  updateAnalyze,
  getAnalyzeCount,
  getCategoryCount,
} = require("../Controller/Analyze.Controller");
const { ifAdminOrStaff } = require("../middlewares/verifyToken");

const router = require("express").Router();
// // /api/posts
router.route("/Add-Analyze").post(ifAdminOrStaff, addAnalyze);
router.route("/updateAnalyze").put(ifAdminOrStaff, updateAnalyze);
router.route("/count").get(ifAdminOrStaff, getAnalyzeCount);
router.route("/getCategorys").get(ifAdminOrStaff, getCategoryCount);
router.route("/getAnalyzes").get(getAllAnalze);
router.route("/getAnalyzesOne/:code").get(getAnalze);


module.exports = router;
