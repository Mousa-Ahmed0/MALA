const mongoose = require("mongoose");
const Joi = require("joi");
//Analyze schema
const analyzeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    code: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isAvailable:{
      type:Boolean,
      default:true,
    },
    analyzeCategory:{
      type: String,
      required: true,

    },
    compnents: [
      {
        nameC: {
          type: String,
          required: true,
          trim: true,
        },
        unit: {
          type: String,
          required: true,
        },
        healthyValue: {
          type: String,
          required: true,
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

const analyze = mongoose.model("Analyze", analyzeSchema);


//validate  analyze
function validateAnalyze(obj) {
  const Schema = Joi.object({
    name: Joi.string(),
  code: Joi.string().required().trim(),
  cost: Joi.number().required(),
  description: Joi.string().required(),
  isAvailable: Joi.boolean().default(true),
  analyzeCategory: Joi.string().required(),
  compnents: Joi.array().items(
    Joi.object({
      nameC: Joi.string().required().trim(),
      unit: Joi.string().required(),
      healthyValue: Joi.string().required(),
    })
  ),
  });
  return Schema.validate(obj,{abortEarly:false});
}

module.exports = {
  analyze,
  validateAnalyze,
};
