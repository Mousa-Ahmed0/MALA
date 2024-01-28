const mongoose = require("mongoose");
const Joi = require("joi");
const massSchema = new mongoose.Schema(
  {
    firstUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    secondUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    ifReadyFirstUser: {
      type: Boolean,
      default: false,
    },
    ifReadySecondUser: {
      type: Boolean,
      default: false,
    },
    massage: [
      {
        senderId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        message: {
          type: String,
        },
        date: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
const Massage = mongoose.model("Massage", massSchema);

//validate Message Model
function vaildationMessage(obj) {
  const Schema = Joi.object({
    message: Joi.string().required(),
    // firstUser: Joi.string().pattern(new RegExp("^[0-9a-fA-F]{24}$")),
    // secondUser: Joi.string().pattern(new RegExp("^[0-9a-fA-F]{24}$")),
    // ifReadyFirstUser: Joi.boolean().default(false),
    // ifReadySecondUser: Joi.boolean().default(false),
    // massage: Joi.array().items(
    //   Joi.object({
    //     senderId: Joi.string()
    //       .pattern(new RegExp("^[0-9a-fA-F]{24}$")),
    //     date: Joi.date().default(new Date()),
    //   })
    // ),
  }); 
  return Schema.validate(obj, { abortEarly: false });
}
module.exports = {
  Massage,
  vaildationMessage,
};
