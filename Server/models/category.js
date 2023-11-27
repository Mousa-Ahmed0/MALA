const mongoose =require('mongoose');
const Joi = require('joi');
//Category schema
const categorySchema =new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    title:{
        type:String,
        required:true,
        trim:true,
    },
},{
    timestamps:true,
})
//Category Model
const Category=mongoose.model("Category",categorySchema);

//validate create Commnt 
function validateCreateCategory(obj){
    const Schema=Joi.object({
        title:Joi.string().trim().required(),
    });
    return Schema.validate(obj);
}
//validate update Commnt 
function validateUpdateCategory(obj){
    const Schema=Joi.object({
        title:Joi.string().trim().required(),
    });
    return Schema.validate(obj);
}

module.exports={
    Category,
    validateCreateCategory,
    validateUpdateCategory
}