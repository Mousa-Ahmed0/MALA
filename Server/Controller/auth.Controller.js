const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const {
  validateRegisterUser,
  validateLoginUser,
  user,
} = require("../models/user");
const Jwt = require("jsonwebtoken");
const { sendEmailForRestPassword } = require("../utils/Email/user.Email");
const nodemailer = require("nodemailer");

/**--------------------------------
 * @desc Register new user
 * @router /api/auth/register
 * @method post
 * @access public
 * ------------------------------------------ */
module.exports.registerUser = asyncHandler(async (req, res) => {
  try {
    // validation
    const { error } = validateRegisterUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    //is user already exists
    let newUser = await user.findOne({ ident: req.body.ident });

    if (newUser) {
      return res.status(400).json({ message: "User already exist" });
    }
    //hash  the password
    const salt = await bcrypt.genSalt(8);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    //new user and save it to database
    newUser = new user({
      ident: req.body.ident,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      sex: req.body.sex,
      phone: req.body.phone,
      email: req.body.email,
      birthday: req.body.birthday,
      city: req.body.city,
      password: hashPassword,
      usertype: req.body.usertype,
    });
    await newUser.save();
    //send a response to client
    res
      .status(201)
      .json({ message: "You registered successfully, please log In" });
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**--------------------------------
 * @desc Login User
 * @router /api/auth/Login
 * @method post
 * @access public
 * ------------------------------------------ */

module.exports.loginUser = asyncHandler(async (req, res) => {
  //validation
  console.log("Req: ", req);
  try {
    const { error } = validateLoginUser(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    //is user already exists
    const newUser = await user.findOne({ phone: req.body.phone });
    if (!newUser)
      return res.status(400).json({ message: "invaild Phone or Password" });

    //check the password
    const match = await bcrypt.compare(req.body.password, newUser.password);
    if (!match) return res.status(400).json({ message: "invaild  password" });
    //Generate Token(jwt)
    const token = newUser.generateAuthToken();
    //send a response to client
    res.status(201).json({
      message: "Your Login successfully",
      token,
    });
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**--------------------------------
 * @desc send forgot password link
 * @router /api/auth/password/passwoed-forgot
 * @method post
 * @access public
 * ------------------------------------------ */

module.exports.sendLinkForgotPassword = asyncHandler(async (req, res) => {
  try {
    //is user already exists
    const oUser = await user.findOne({ email: req.body.email });
    if (!oUser) return res.status(404).json({ message: "user not found" });
    const email = req.body.email;
    const secret = process.env.SECRET_KEY + oUser.password;
    const token = Jwt.sign({ email: oUser.email, id: oUser.id }, secret, {
      expiresIn: "20m",
    });
    const link = `http://localhost:3000/auth/password/reset-password/${oUser._id}/${token}`;
    await sendEmailForRestPassword({ email, link });
    res.status(200).json({ message: "click on link", reset: link });
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Internal Server Error", error });
  }
});

/**--------------------------------
 * @desc Resat the password
 * @router /api/auth/password/rest-passwoed/:userId/:token
 * @method post
 * @access public
 * ------------------------------------------ */

module.exports.restPassword = asyncHandler(async (req, res) => {
  try {
    //is user already exists
    const oUser = await user.findById(req.params.userId);
    if (!oUser) return res.status(404).json({ message: "user not found" });

    const secret = process.env.SECRET_KEY + oUser.password;
    Jwt.verify(req.params.token, secret);

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    oUser.password = req.body.password;

    await oUser.save();
    console.log(oUser.password);
    res.status(201).json({ message: "password is change" });
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    console.error("Error :", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
