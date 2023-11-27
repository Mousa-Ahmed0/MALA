// const { createPost, getAllPost, getPost, getPostCount, deletePost, updatePost, updatePostImage, toggleLike } = require('../Controller/post.Controller');
const {
  addAnalyze,
  getAllAnalze,
  getAnalze,
  updateAnalyze,
} = require("../Controller/Analyze.Controller");
const photoUpload = require("../middlewares/photoUpload");
const validateObjectId = require("../middlewares/validateObjectId");
const { verifyToken, ifAdminOrStaff } = require("../middlewares/verifyToken");

const router = require("express").Router();
// // /api/posts
router.route("/Add-Analyze").post(ifAdminOrStaff, addAnalyze);
router.route("/updateAnalyze").put(ifAdminOrStaff, updateAnalyze);
router.route("/getAnalyzes").get(getAllAnalze);
router.route("/getAnalyzesOne/:code").get(getAnalze);

//     .get(getAllPost);
// // /api/posts/count
// router.route("/count").get(getPostCount);
// // /api/posts/:id
// router.route("/:id")
//     .get(validateObjectId,getPost)
//     .delete(validateObjectId,verifyToken,deletePost)
//     .put(validateObjectId,verifyToken,updatePost);

// // /api/posts/update-image/:id
// router.route("/update-image/:id")
//     .put (validateObjectId,verifyToken,photoUpload.single("image"),updatePostImage);

// // /api/posts/like/:id
// router.route("/like/:id")
//     .put(validateObjectId,verifyToken,toggleLike);
module.exports = router;
