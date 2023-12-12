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

// Validate component array
const validateCompnets = Joi.object({
  nameC: Joi.string().trim().required(),
  unit: Joi.string().trim().required(),
  healthyValue: Joi.string().trim().required(),
});
//validate  analyze
function validateAnalyze(obj) {
  const Schema = Joi.object({
    name: Joi.string().trim().required(),
    code: Joi.string().trim().required(),
    cost: Joi.number().required(),
    description: Joi.string().trim().required(),
    compnents: Joi.array().allow().items(validateCompnets),
  });
  return Schema.validate(obj);
}

module.exports = {
  analyze,
  validateAnalyze,
};
