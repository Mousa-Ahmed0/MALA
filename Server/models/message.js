const mongoose = require("mongoose");
const massSchema = new mongoose.Schema(
  {
    firstUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    secondUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    ifReadyFirstUser: {
      type: Boolean,
      default: false
    },
    ifReadySecondUser: {
      type: Boolean,
      default: false
    },
    massage: [
      {
        senderId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        mass: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          default: new Date(),
        }
      }

    ],
  
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