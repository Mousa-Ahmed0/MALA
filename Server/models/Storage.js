const mongoose = require("mongoose");
const Joi = require("joi");

//Storage Schema
const storageSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: [true, "Item name is required"],
      trim: true,
    },
    theNumber: {
      type: Number,
      required: [true, "The number is required"],
    },
    cost: {
      type: Number,
      required: [true, "Cost is required"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
//Storage Model
const Storage = mongoose.model("Storage", storageSchema);

//validate storage Model
function vaildationStorage(obj) {
  const Schema = Joi.object({
    itemName: Joi.string().trim().required(),
    theNumber: Joi.number().required(),
    cost: Joi.number().required(),
  });
  return Schema.validate(obj);
}
module.exports = {
  Storage,
  vaildationStorage,
};
