const mongoose = require("mongoose");
const guestSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
        },
        message: {
            type: String,
            require: true,
        },
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
const Guest = mongoose.model("Guest", guestSchema);

module.exports = {
    Guest
};