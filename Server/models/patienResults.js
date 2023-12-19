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
    doctorIdent: {
      type: Number,
    },
    doctorName: {
      type: String,
    },
    date: {
      type: Date,
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
            compontResult: [
              {
                resultValues: [
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
                resultDate: {
                  type: Date,
                  required: true,
                  default: new Date(),
                },
              },
            ],
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
