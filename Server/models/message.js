const mongoose = require("mongoose");
const massSchema = new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      date: {
        type: Date,
        default:new Date(),
      },
      massage: {
        type: String,
        required: true,
      },
      ifReady:{
        type:Boolean,
        default:false
      },
    },
    {
      timestamps: true,
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
    }
  );
  const Massage = mongoose.model("Massage", massSchema);

  module.exports = {
    Massage
  };