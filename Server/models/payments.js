const mongoose = require("mongoose");
const Joi = require("joi");
//payments schema
const paymentsSchema = new mongoose.Schema(
  {
    identPatient: {
      type: String,
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
    },
    value:{
      type:Number,
      default:1,
    },
    discountedValue:{
      type: Number,

    },
   
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const payments = mongoose.model("payments", paymentsSchema);
module.exports={
    payments,
}