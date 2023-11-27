const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const {
  user,
  validateRegisterUser,
  validateLoginUser,
} = require("../models/user");
/**--------------------------------
 * @desc Register new user
 * @router /api/auth/register
 * @method post
 * @access public
 * ------------------------------------------ */
module.exports.registerUser = asyncHandler(async (req, res) => {
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
});

/**--------------------------------
 * @desc Login User
 * @router /api/auth/Login
 * @method post
 * @access public
 * ------------------------------------------ */

module.exports.loginUser = asyncHandler(async (req, res) => {
  //validation
  const { error } = validateLoginUser(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

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
});
