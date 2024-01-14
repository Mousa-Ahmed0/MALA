const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
//user Schema
const UserSchema = new mongoose.Schema(
  {
    ident: {
      type: Number,
      required: [true, "ID is required"],
      unique: true,
    },
    firstname: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    lastname: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    sex: {
      type: String,
      required: [true, "sex is required"],
      enum: ["Male", "Female"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      minlength: 7,
      maxlength: 100,
    },
    birthday: {
      type: Date,
      required: [true, "Birthday is required"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    profilePhoto: {
      type: Object,
      default: {
        url: "https://adwixy.com/images/avatar-03.png",
        publicId: null,
      },
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [8, "Too short password"],
    },
    usertype: {
      type: String,
      enum: ["Staff", "Patient", "Doctor", "Admin"],
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
// Populate post that belongs to this user whene he/she get his/her profile
// UserSchema.virtual("Posts",{
//     ref:"Post",
//     foreignField:"user",
//     localField:"_id",
// });
//generate auth token 
UserSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      id: this._id,
      ident: this.ident,
      usertype: this.usertype,
      city: this.city,
      birthday: this.birthday,
      profilePhoto: this.profilePhoto,
      email: this.email,
      phone: this.phone,
      firstname: this.firstname,
      lastname: this.lastname,
      sex: this.sex,
      isAdmin: this.isAdmin,
    },
    process.env.SECRET_KEY
  );
};
//user Model
const user = mongoose.model("User", UserSchema);
//validate Register user
function validateRegisterUser(obj) {
  const Schema = Joi.object({
    ident: Joi.number().required(),
    firstname: Joi.string().trim().min(2).max(100).required(),
    lastname: Joi.string().trim().min(2).max(15).required(),
    sex: Joi.string().required(),
    phone: Joi.string().trim().min(2).max(13).required(),
    email: Joi.string().trim().min(5).max(100).email().required(),
    birthday: Joi.date().required(),
    city: Joi.string().trim().min(2).max(100).required(),
    usertype: Joi.string().trim().required(),
    password: Joi.string().trim().min(8).required(),
  });
  return Schema.validate(obj,{abortEarly:false});
}

//validate Login user
function validateLoginUser(obj) {
  const Schema = Joi.object({
    phone: Joi.string().trim().min(2).max(15).required(),
    password: Joi.string().trim().min(8).required(),
  });
  return Schema.validate(obj,{abortEarly:false});
}

//validate Register user
function validateUpdateUser(obj) {
  const Schema = Joi.object({
    ident: Joi.number().required(),
    firstname: Joi.string().trim().min(2).max(100).required(),
    lastname: Joi.string().trim().min(2).max(15).required(),
    phone: Joi.string().trim().min(2).max(13).required(),
    city: Joi.string().required(),
  });
  return Schema.validate(obj,{abortEarly:false});
}
module.exports = {
  user,
  validateRegisterUser,
  validateLoginUser,
  validateUpdateUser,
};
