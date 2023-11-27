const mongoose =require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
//staff user Schema
const staffUserSchema =new mongoose.Schema({
    doctorAddress:{
        type:String,
        required:[true,'Doctor Address is required'],
        trim:true,
       
    },
    medicalSpecialist:{
        type:String,
        required:[true,'Medical Specialist is required'],
        trim:true,
        
    },

},{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});
// Populate post that belongs to this user whene he/she get his/her profile
// staffUserSchema.virtual("UserInfo",{
//     ref:"User",
//     foreignField:"userId",
//     localField:"_id",
// });

//user Model
const userStaff=mongoose.model("staffUser",staffUserSchema);
//validate Register user
function validateStaff(obj){
    const Schema=Joi.object({
        doctorAddress:Joi.string().trim().required(),
        medicalSpecialist:Joi.string().trim().required(),
    });
    return Schema.validate(obj);
}

module.exports={
    userStaff,
    validateStaff,
    
} 