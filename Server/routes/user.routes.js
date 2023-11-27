const {
  getAllUsers,
  getAllDoctorPatient,
  deleteUser,
  updateUser,
  profilePhotoUpload,
  getUsersCount,
  getUsersCountStaff,
  getUsersCountPatient,
  getUsersCountDoctor,
  getProfile,
  getAllDoctor,
  getAllStuffAdmin,
} = require("../Controller/user.Controller");
const {
  ifAdmin,
  verifyTokenOnlyUser,
  verifyToken,
  verifyTokenOnlyUserOrAdmin,
  ifAdminOrStaff,
} = require("../middlewares/verifyToken");
const validateId = require("../middlewares/validateObjectId");
const photoUpload = require("../middlewares/photoUpload");
const router = require("express").Router();
// /api/user/
router.get("/get-users", ifAdminOrStaff, getAllUsers);
//count user
router.get("/getCount", ifAdmin, getUsersCount);
router.get("/countStaff", verifyToken, getUsersCountStaff);
router.get("/countPatient", verifyToken, getUsersCountPatient);
router.get("/countDoctor", verifyToken, getUsersCountDoctor);
//get doctor
router.get("/getAllDoctor", getAllDoctor);
router.get("/getAllStuffAdmin", getAllStuffAdmin);
//profile
router.get("/profile/:id", validateId, getProfile);
//api/users/profile /profile-photo-upload
router
  .route("/profile/profile-photo-upload")
  .post(verifyToken, photoUpload.single("image"), profilePhotoUpload);

router.put("/upadteUser/:id", validateId, verifyToken, updateUser);
router.get("/getAllDoctorPatient", ifAdminOrStaff, getAllDoctorPatient);
router.delete(
  "/deleteUser/:id",
  validateId,
  verifyTokenOnlyUserOrAdmin,
  deleteUser
);
router
  .route("/profile-photo-upload")
  .post(verifyToken, photoUpload.single("image"), profilePhotoUpload);

  module.exports = router;

// // /api/users/count
// router.get("/count",ifAdmin,getUsersCount);

// // /api/users/profile:id
// router.route("/profile/:id")
//       .get(validateId,getUser)
//       .put(validateId,verifyTokenOnlyUser,updateUserProfile)
//       .delete(validateId,verifyTokenOnlyUserOrAdmin,deleteUserAccount);
// //api/users/profile /profile-photo-upload
// router.route("/profile/profile-photo-upload")
//       .post(verifyToken,photoUpload.single("image"),profilePhotoUpload);

