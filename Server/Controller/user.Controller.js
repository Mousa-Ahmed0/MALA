const asyncHandler = require("express-async-handler");
const { user, validateUpdateUser } = require("../models/user");
const {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
} = require("../utils/cloudinary");
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs");
const { jwt } = require("twilio");
/**--------------------------------
 * @desc Get all Users
 * @router /api/users/
 * @method GET
 * @access private just admin
 * ------------------------------------------ */
module.exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await user.find().select("-password");
  res.status(200).json(users);
});
/**--------------------------------
 * @desc Get  Users Count
 * @router /api/user/getCount
 * @method GET
 * @access private (only admin)
 * ------------------------------------------ */
module.exports.getUsersCount = asyncHandler(async (req, res) => {
  const count = await user.count();
  res.status(200).json(count);
});
/**--------------------------------
 * @desc Get  Users staff count
 * @router /api/user/countStaff
 * @method GET
 * @access private (only admin)
 * ------------------------------------------ */
module.exports.getUsersCountStaff = asyncHandler(async (req, res) => {
  const count = await user.count({ usertype: "Staff" });
  res.status(200).json(count);
});
/**--------------------------------
 * @desc Get  Users Patient count
 * @router /api/user/countPatient
 * @method GET
 * @access private (only admin)
 * ------------------------------------------ */
module.exports.getUsersCountPatient = asyncHandler(async (req, res) => {
  const count = await user.count({ usertype: "Patient" });
  res.status(200).json(count);
});
/**--------------------------------
 * @desc Get  Users Doctor Count
 * @router /api/user/countDoctor
 * @method GET
 * @access private (only admin)
 * ------------------------------------------ */
module.exports.getUsersCountDoctor = asyncHandler(async (req, res) => {
  const count = await user.count({ usertype: "Doctor" });
  res.status(200).json(count);
});

/**--------------------------------
 * @desc Get all patient and Doctor
 * @router /api/user/getAllDoctorPatient
 * @method GET
 * @access private admin or Staff
 * ------------------------------------------ */
module.exports.getAllDoctorPatient = asyncHandler(async (req, res) => {
  const users = await user.find({ usertype: { $in: ["Patient", "Doctor"] } }).select("-password").sort({createdAt: -1});
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});
/**--------------------------------
 * @desc Get all Doctor
 * @router /api/user/getAllDoctor
 * @method GET
 * @access public
 * ------------------------------------------ */
module.exports.getAllDoctor = asyncHandler(async (req, res) => {
  const users = await user.find({ usertype:  "Doctor"}).select("-password").sort({createdAt: -1});
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

/**--------------------------------
 * @desc Get all Stuff and admin
 * @router /api/user/getAllStuffAdmin
 * @method GET
 * @access public
 * ------------------------------------------ */
module.exports.getAllStuffAdmin = asyncHandler(async (req, res) => {
  const users = await user.find({ usertype:  { $in: ["Admin", "Staff"] }}).select("-password").sort({createdAt: -1});
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});
/**--------------------------------
 * @desc delete user by id
 * @router /api/user/deleteUser/:id
 * @method Delete
 * @access private admin
 * ------------------------------------------ */
module.exports.deleteUser = asyncHandler(async (req, res) => {
  const deleteU = await user.findByIdAndDelete(req.params.id);
  if (deleteU) {
    res.status(200).json({ message: "User is Deleted" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

/**--------------------------------
 * @desc profile user by id
 * @router /api/user/profile/:id
 * @method GET
 * @access public
 * ------------------------------------------ */
module.exports.getProfile = asyncHandler(async (req, res) => {
  const profile = await user.findById(req.params.id).select("-password");
  if (profile) {
    res.status(200).json({ message: "User profile", profile });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});
/**--------------------------------
 * @desc update  user by id
 * @router /api/user/updateUser/:id
 * @method Put
 * @access private user
 * ------------------------------------------ */
module.exports.updateUser = asyncHandler(async (req, res) => {
  //hash new password
  //@TO-Do
  //save to database
  const updateU = await user.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        ident: req.body.ident,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        city: req.body.city,
      },
    },
    { new: true }
  );
  if (updateU) {
    const token=jwt.singn(    {
      id: updateU._id,
      ident: updateU.ident,
      usertype: updateU.usertype,
      city: updateU.city,
      birthday: updateU.birthday,
      profilePhoto: updateU.profilePhoto,
      email: updateU.email,
      phone: updateU.phone,
      firstname: updateU.firstname,
      lastname: updateU.lastname,
      sex: updateU.sex,
      isAdmin: updateU.isAdmin,
    },process.env.SECRET_KEY);
    res.status(200).json({ updateU,token, message: "User is Updated" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

/**--------------------------------
 * @desc   Profile photo upload
 * @router /api/user/profile-photo-upload
 * @method post
 * @access private (only logged in user)
 * ------------------------------------------ */
module.exports.profilePhotoUpload = asyncHandler(async (req, res) => {
  //1- validation
  if (!req.file) return res.status(400).json({ message: "No file provided" });

  //2- get the  path to the image
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);

  //3- upload to cloudinary
  const result = await cloudinaryUploadImage(imagePath);
  // console.log("upload to cloudinary");

  // console.log(result);

  //4- get the user from DB
  const userN = await user.findById(req.user.id);
  // console.log("get the user from DB");

  // console.log(userN);

  //5- delete the old profile photo if exist
  if (userN.profilePhoto.publicId !== null)
    await cloudinaryRemoveImage(userN.profilePhoto.publicId);

  //6- chancg the profilephoto filed in the DB
  userN.profilePhoto = {
    url: result.secure_url,
    publicId: result.public_id,
  };
  await userN.save();
  // console.log("save db");

  // console.log(userN);
  //7- send response to client
  res.status(200).json({
    message: "Your profile photo uploaded successfully",
    profilePhoto: { url: userN.secure_url, publicId: userN.public_id },
  });

  //8- remove image from the server
  fs.unlinkSync(imagePath);
});
