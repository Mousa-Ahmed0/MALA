const { registerUser, loginUser, sendLinkForgotPassword } = require('../Controller/auth.Controller');

const router=require('express').Router();
// /api/auth/register
router.post("/register",registerUser);
// /api/auth/Login
router.post("/login",loginUser );

// /api/auth/resetPasword
router.post("/resetPaswordEmailLink",sendLinkForgotPassword );
module.exports=router;