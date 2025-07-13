const mongoose = require("mongoose");
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
      commnets :[
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
    
    },
    {timestamps:true}
)
const Recipe = mongoose.model('Recipe',recipeSchema)
module.exports = Recipe;