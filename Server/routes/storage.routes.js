const {ifAdmin,verifyTokenOnlyUser,verifyToken,verifyTokenOnlyUserOrAdmin,ifAdminOrStaff,
} = require("../middlewares/verifyToken");
const validateId = require("../middlewares/validateObjectId");
const { addItem, getAllItem, updateItem, deleteItem } = require("../Controller/storage.Controller");
const router = require("express").Router();

router.post('/additem',ifAdminOrStaff,addItem);
router.get('/getAllItem',ifAdminOrStaff,getAllItem);
router.put('/updateItem/:id',validateId,ifAdminOrStaff,updateItem);
router.delete('/deleteItem/:id',validateId,ifAdminOrStaff,deleteItem);

module.exports = router;
 