const mongoose = require("mongoose");

function arraylimit(val){
   return val.length<=5;
}
const recipeSchema = new mongoose.Schema(
    {
      recipeName :{
        type : String,
        required : true,
        maxlength : 20,
        unique : true
      },
      description : {
        type : String,
        required : true,
        maxlength : 100
      },
      instructions : {
        type : String,
        required : true,
        maxlength : 800,
      },
      images : {
        type : [String],
        required : true,
        maxlength : 5,
      },
      ratings :[{
        user : {
          type : mongoose.Schema.Types.ObjectId,
          ref  :'User'
        },
        value:{
          type: Number,
          required : true,
          min : 1,
          max : 5
        }
      },

      ]
      ,
      feedbacks:[
        {
         user: {
            type :mongoose.Schema.Types.ObjectId,
            ref : 'User'

          },
          value :{
            type :String,
            required : true,
            minlength : 20,
            maxlength : 50
          }
        }
      ],
      comments :[
        {
          user:{
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
          },
          value :{
            type : String,
            required : true,
            minlength : 10,
            maxlength : 50
          }
        }
      ],
      tags: {
        type :[String],
        required : true,
        valide : [arraylimit,'You cannot add more than 5 tags']
      }
      
    
    },
    {timestamps:true}
)
const Recipe = mongoose.model('Recipe',recipeSchema)
module.exports = Recipe;