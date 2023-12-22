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
const analyzeResult = mongoose.model("Result", analyzeResultSchema);
module.exports = {
  analyzeResult,
};
