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
      }
    },
    {timestamps:true}
)
const Recipe = mongoose.model('Recipe',recipeSchema)
module.exports = Recipe;