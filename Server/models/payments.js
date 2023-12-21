const mongoose = require("mongoose");
const Joi = require("joi");
//payments schema
const paymentsSchema = new mongoose.Schema(
  {
    resultId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Result",
    },
    // patinDetails:{

    // }
    // ,
    payDate: {
      type: Date,
      required: true,
    },
    InsuranceCompName: {
      type: String,
    },
    InsuranceCompPers: {
      type: Number,
    },
    paiedvalue: {
      type: Number,
      default: 1,
    },
    discountedValue: {
      type: Number,

    },
    resultCostDetils: [{
      anlayzeCost: {
        aName: {
          type: String,
        },
        aCost: {
          type: Number,
        },
      },
    }],
    totalValue: {
      type: Number,
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const payments = mongoose.model("payments", paymentsSchema);
module.exports = {
  payments,
}