const mongoose = require("mongoose");
const Joi = require("joi");
//payments schema
const paymentsSchema = new mongoose.Schema(
  {
    resultId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Result",
      required: true,
    },
    payDate: {
      type: Date,
      required: true,
    },
    InsuranceCompName: {
      type: String,
    },
    InsuranceCompPers: {
      type: Number,
      required: true,
    },
    paiedvalue: {
      type: Number,
      default: 1,
      required: true,
    },
    discountedValue: {
      type: Number,
      required: true,
    },
    resultCostDetils: [{
      anlayzeCost: {
        aName: {
          type: String,
          required: true,
        },
        aCost: {
          type: Number,
          required: true,
        },
      },
    }],
    totalValue: {
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//validate payment Model
function vaildationPayment(obj) {
  const Schema = Joi.object({
    resultId: Joi.string().pattern(new RegExp("^[0-9a-fA-F]{24}$")).required(),
    payDate: Joi.date().required(),
    InsuranceCompName: Joi.string().allow(''), // Allow empty string for InsuranceCompName
    InsuranceCompPers: Joi.number(),
    paiedvalue: Joi.number().default(1).required(),
    discountedValue: Joi.number().required(),
    resultCostDetils: Joi.array().items(
      Joi.object({
        anlayzeCost: Joi.object({
          aName: Joi.string().required(),
          aCost: Joi.number().required(),
        }),
      })
    ),
    totalValue: Joi.number().required(),
  });
  return Schema.validate(obj,{abortEarly:false});
}
const payments = mongoose.model("payments", paymentsSchema);
module.exports = {
  payments,
  vaildationPayment,
}