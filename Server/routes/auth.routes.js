const { registerUser, loginUser } = require('../Controller/auth.Controller');
const { sendEmailForRestPassword } = require('../utils/Email/user.Email');

const router=require('express').Router();
// /api/auth/register
router.post("/register",registerUser);
// /api/auth/Login
router.post("/login",loginUser );

// /api/auth/resetPasword
router.post("/resetPasword",sendEmailForRestPassword );
module.exports=router;