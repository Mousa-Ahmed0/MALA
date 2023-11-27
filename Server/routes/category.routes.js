const { createCategory, getAllCategory, deleteCategory } = require('../Controller/category.Controller');
const validateObjectId = require('../middlewares/validateObjectId');
const {  ifAdmin } = require('../middlewares/verifyToken');

const router=require('express').Router();
// /api/category
router.route("/")
    .post(ifAdmin,createCategory)
    .get(getAllCategory)
// /api/category/:id
router.route("/:id")
    .delete(validateObjectId,ifAdmin,deleteCategory);
module.exports=router;