const mongoose =require('mongoose');
const Joi = require('joi');
//post schema
const commentSchema =new mongoose.Schema({
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Post",
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    text:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },

},{
    timestamps:true,
})
//Commnt Model
const Comment=mongoose.model("Comment",commentSchema);

//validate create Commnt 
function validateCreateCommnt(obj){
    const Schema=Joi.object({
        postId:Joi.string().required().label("Post ID"),
        text:Joi.string().trim().required(),
    });
    return Schema.validate(obj);
}
//validate update Commnt 
function validateUpdateCommnt(obj){
    const Schema=Joi.object({
        text:Joi.string().trim().required(),
    });
    return Schema.validate(obj);
}

module.exports={
    Comment,
    validateCreateCommnt,
    validateUpdateCommnt
}