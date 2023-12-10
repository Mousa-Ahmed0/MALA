const mongoose = require('mongoose');


const advertisementSchema = new mongoose.Schema({
    ident: {
        type: Number,
        unique:true
        // required: true
    },
    title: {
        type: String,
        // required: true
    },
    addText: {
        type: String,
    },
    creDate: {
        type: Date,
        // required: true
    },
    expDate: {
        type: Date,
        // required: true,
        // validate: {
        //     validator: function (value) {
        //         return value >= this.creationDate;
        //     },
        //     message: 'Expiry date must be greater than or equal to creation date.'
        // }
    }, 

    advert:[ {
        type: Object,
        default: {
          url: "https://adwixy.com/images/avatar-03.png",
          publicId: null,
        }, 
      },]
});



const Advertisement = mongoose.model('Advertisement', advertisementSchema);

module.exports = { Advertisement };
