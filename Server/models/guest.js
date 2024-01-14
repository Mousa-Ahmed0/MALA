const mongoose = require("mongoose");
const Joi = require("joi");

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


//validate Register user
function validateGuestUser(obj) {
    const Schema = Joi.object({
        fullName: Joi.string().trim().min(2).max(100).required(),
        message: Joi.string().trim().required(),
        email: Joi.string().trim().min(5).max(100).email().required(),
        ifReady: Joi.boolean().required(),
    });
    return Schema.validate(obj);
}

module.exports = {
    Guest,
    validateGuestUser
};