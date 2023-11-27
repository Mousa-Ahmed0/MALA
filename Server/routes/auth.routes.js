const { registerUser, loginUser } = require('../Controller/auth.Controller');

const router=require('express').Router();
// /api/auth/register
router.post("/register",registerUser);
// /api/auth/Login
router.post("/login",loginUser );

module.exports=router;