const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
//post schema
const analyzeResultSchema = new mongoose.Schema(
  {
    staffIdent: {
      type: Number,
      required: true,
    },
    patientIdent: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    doctorIdent: {
      type: Number,
    },
    doctorName: {
      type: String,
    },
    isDone: {
      type: Boolean,
      default: false,
      required: true,
    },
    isPaied: {
      type: Boolean,
      default: false,
      required: true,
    },
    resultSet: [
      {
        anlyzeId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Analyze",
        },
        result: [
          {
            name: {
              type: String,
              required: true,
            },
            value: {
              type: String,
              required: true,
            },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//validation
function vaildationResults(obj) {
  const Schema = Joi.object({
    staffIdent: Joi.number().required(),
    patientIdent: Joi.number().required(),
    date: Joi.date().required(),
    doctorIdent: Joi.number(),
    doctorName: Joi.string().allow(""),
    isDone: Joi.boolean().default(false).required(),
    isPaied: Joi.boolean().default(false).required(),
    resultSet: Joi.array().items(
      Joi.object({
        anlyzeId: Joi.string()
          .pattern(new RegExp("^[0-9a-fA-F]{24}$"))
          .required(),
        result: Joi.array()
          .items(
            Joi.object({
              name: Joi.string().required(),
              value: Joi.string().required(),
            })
          )
          .required(),
      })
    ),
  });
  return Schema.validate(obj, { abortEarly: false });
}
const analyzeResult = mongoose.model("Result", analyzeResultSchema);
module.exports = {
  analyzeResult,
  vaildationResults,
};
