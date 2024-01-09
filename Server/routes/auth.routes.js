const { registerUser, loginUser, sendLinkForgotPassword, restPassword } = require('../Controller/auth.Controller');
const {
    verifyToken
  } = require("../middlewares/verifyToken");
const validateId = require("../middlewares/validateObjectId");

const router=require('express').Router();
// /api/auth/register
router.post("/register",registerUser);
// /api/auth/Login
router.post("/login",loginUser );

// /api/auth/resetPasword
router.post("/resetPaswordEmailLink",verifyToken,sendLinkForgotPassword );
router.post("/password/rest-passwoed/:userId/:token",validateId,verifyToken,restPassword );
module.exports=router;