const mongoose = require("mongoose");
const massSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    recvId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    ifReadySend: {
      type: Boolean,
      default: false
    },
    ifReadyRecv: {
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