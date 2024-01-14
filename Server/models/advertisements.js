const mongoose = require("mongoose");

const advertisementSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
    unique: true
  },
  addText: {
    type: String,
  },
  creDate: {
    type: Date,
    required: true
  },
  expDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value >= this.creDate;
      },
      message: 'Expiry date must be greater than or equal to creation date.'
    }
  },

  advert: [
    {
      type: Object,
      default: {
        url: "https://adwixy.com/images/avatar-03.png",
        publicId: null,
      },
    },
  ],
});

const Advertisement = mongoose.model("Advertisement", advertisementSchema);

//validate Advertisement Model
function vaildationAdvertisement(obj) {
  const Schema = Joi.object({
    title: Joi.string().required(),
    addText: Joi.string(),
    creDate: Joi.date().required(),
    expDate: Joi.date().min(Joi.ref('creDate')).required(),
    advert: Joi.array().items(
      Joi.object({
        url: Joi.string().uri().default("https://adwixy.com/images/avatar-03.png"),
        publicId: Joi.string().allow(null),
      })
    ).default([
      {
        url: "https://adwixy.com/images/avatar-03.png",
        publicId: null,
      },
    ]),
  });
  return Schema.validate(obj, { abortEarly: false });
}
module.exports = { Advertisement,vaildationAdvertisement };
