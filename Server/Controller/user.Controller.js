const asyncHandler = require("express-async-handler");
const { user, validateUpdateUser } = require("../models/user");
const {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
} = require("../utils/cloudinary");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
/**--------------------------------
 * @desc Get all Users
 * @router /api/users/
 * @method GET
 * @access private just admin
 * ------------------------------------------ */
module.exports.getAllUsers = asyncHandler(async (req, res) => {
  try {
    const USER_PER_PAGE = 1;
    const userNumber = req.query.userNumber;
    const users = await user
      .find()
      .select("-password")
      .skip((userNumber - 1) * USER_PER_PAGE)
      .limit(USER_PER_PAGE);
    res.status(200).json(users);
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    res.status(500).json({ errorMess: "Internal Server Error", error });
  }
});
/**--------------------------------
 * @desc Get  Users Count
 * @router /api/user/getCount
 * @method GET
 * @access private (only admin)
 * ------------------------------------------ */
module.exports.getUsersCount = asyncHandler(async (req, res) => {
  try {
    const count = await user.count();
    res.status(200).json(count);
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    res.status(500).json({ errorMess: "Internal Server Error", error });
  }
});
/**--------------------------------
 * @desc Get  Users staff count
 * @router /api/user/countStaff
 * @method GET
 * @access private (only admin)
 * ------------------------------------------ */
module.exports.getUsersCountStaff = asyncHandler(async (req, res) => {
  try {
    const count = await user.count({ usertype: "Staff" });
    res.status(200).json(count);
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    res.status(500).json({ errorMess: "Internal Server Error", error });
  }
});
/**--------------------------------
 * @desc Get  Users Patient count
 * @router /api/user/countPatient
 * @method GET
 * @access private (only admin)
 * ------------------------------------------ */
module.exports.getUsersCountPatient = asyncHandler(async (req, res) => {
  try {
    const count = await user.count({ usertype: "Patient" });
    res.status(200).json(count);
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    res.status(500).json({ errorMess: "Internal Server Error", error });
  }
});
/**--------------------------------
 * @desc Get  Users Doctor Count
 * @router /api/user/countDoctor
 * @method GET
 * @access private (only admin)
 * ------------------------------------------ */
module.exports.getUsersCountDoctor = asyncHandler(async (req, res) => {
  try {
    const count = await user.count({ usertype: "Doctor" });
    res.status(200).json(count);
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    res.status(500).json({ errorMess: "Internal Server Error", error });
  }
});

/**--------------------------------
 * @desc Get all patient and Doctor
 * @router /api/user/getAllDoctorPatient
 * @method GET
 * @access private admin or Staff
 * ------------------------------------------ */
module.exports.getAllDoctorPatient = asyncHandler(async (req, res) => {
  try {
    const users = await user
      .find({ usertype: { $in: ["Patient", "Doctor"] } })
      .select("-password")
      .sort({ createdAt: -1 });
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    res.status(500).json({ errorMess: "Internal Server Error", error });
  }
});
/**--------------------------------
 * @desc Get all Doctor
 * @router /api/user/getAllDoctor
 * @method GET
 * @access public
 * ------------------------------------------ */
module.exports.getAllDoctor = asyncHandler(async (req, res) => {
  try {
    const users = await user
      .find({ usertype: "Doctor" })
      .select("-password")
      .sort({ createdAt: -1 });
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    res.status(500).json({ errorMess: "Internal Server Error", error });
  }
});

/**--------------------------------
 * @desc Get all Stuff and admin
 * @router /api/user/getAllStuffAdmin
 * @method GET
 * @access public
 * ------------------------------------------ */
module.exports.getAllStuffAdmin = asyncHandler(async (req, res) => {
  try {
    const users = await user
      .find({ usertype: { $in: ["Admin", "Staff"] } })
      .select("-password");
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    res.status(500).json({ errorMess: "Internal Server Error", error });
  }
});
/**--------------------------------
 * @desc delete user by id
 * @router /api/user/deleteUser/:id
 * @method Delete
 * @access private admin
 * ------------------------------------------ */
module.exports.deleteUser = asyncHandler(async (req, res) => {
  try {
    const deleteU = await user.findByIdAndDelete(req.params.id);
    if (deleteU) {
      res.status(200).json({ message: "User is Deleted" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    res.status(500).json({ errorMess: "Internal Server Error", error });
  }
});

/**--------------------------------
 * @desc profile user by id
 * @router /api/user/profile/:id
 * @method GET
 * @access public
 * ------------------------------------------ */
module.exports.getProfile = asyncHandler(async (req, res) => {
  try {
    const profile = await user.findById(req.params.id).select("-password");
    if (profile) {
      res.status(200).json({ message: "User profile", profile });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    res.status(500).json({ errorMess: "Internal Server Error", error });
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
  try {
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
      const token = jwt.sign(
        {
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
        },
        process.env.SECRET_KEY
      );
      res.status(200).json({ updateU, token, message: "User is Updated" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    res.status(500).json({ errorMess: "Internal Server Error", error });
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
  try {
    if (!req.file) return res.status(400).json({ message: "No file provided" });

    //2- get the  path to the image
    const imagePath = path.join(__dirname, `../images/${req.file.filename}`);

    //3- upload to cloudinary
    const result = await cloudinaryUploadImage(imagePath);

    //4- get the user from DB
    const userN = await user.findById(req.user.id);

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
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    res.status(500).json({ errorMess: "Internal Server Error", error });
  }
});
