const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   
    username : {
        type : String,
        required: true
    },
    email:{
        type : String, 
        unique : true,
        required : true
    },
    password:{
           type : String,
           required  : true
    },
    bio:{
           type : String,
           
    },
    profilepic : {
          type : String
    },
    savedRecipes :[
        {
            type : mongoose.Schema.ObjectId,
            ref : 'Recipe'
        }
    ],
    followers:[{
        type : mongoose.Schema.Types.ObjectId,
        ref:'User'
    
    }],
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }]
        

}, {timestamps:true})

const User = mongoose.model('User',userSchema);
module.exports = User;