const mongoose = require("mongoose");
const massSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    massage: [
      {
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
    ifReady: {
      type: Boolean,
      default: false
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