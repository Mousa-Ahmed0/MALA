const { createComment, getAllComment, deleteComment, updateComment } = require('../Controller/commnt.Controller');
const validateObjectId = require('../middlewares/validateObjectId');
const { verifyToken, verifyTokenOnlyUserOrAdmin } = require('../middlewares/verifyToken');

const router=require('express').Router();
// /api/comments
router.route("/")
    .post(verifyToken,createComment)
    .get(verifyTokenOnlyUserOrAdmin,getAllComment);

// /api/comments/:id
router.route("/:id")
    .delete(validateObjectId,verifyToken,deleteComment)
    .put(validateObjectId,verifyToken,updateComment);
module.exports=router;