const Recipe = require("../models/Recipe")


exports.getRecipe = async(req,res)=>{
    try{
       const {name} = req.params;
       const recipe = await Recipe.findOne({recipeName : name});
       if(!recipe) return res.status(400).json({message : " no recipe found"});
       return res.status(200).json({
          _id  : recipe._id,
          recipeName : recipe.recipeName,
          description : recipe.description,
          instructions : recipe.instructions,
          images : recipe.images
       })
    }catch(err){
        res.status(500).json({message : "internal server error"})
    }
}
exports.getAllrecipes = async (req,res)=>{
    try{
       
       const recipes = await Recipe.find();
       if(recipes.length===0){
        return res.status(200).json({message : "no recipes found"})
       }
       return res.status(200).json({recipes});
     
    }catch(err){
        res.status(500).json({message : "internal server error"})
    }
}
exports.createRecipe = async(req,res)=>{
    try{
         const {recipeName,description , instructions , images} = req.body;
         const recipe = await Recipe.findOne({recipeName : recipeName});
         if(recipe) return res.status(201).json({message : "Recipe Name already Exists , Please find Another"});
         if(recipeName.length>30) return res.status(201).json({message : "RecipeName should not be greater than 30 chars"});
         if(description.length>100) return res.status(201).json({message : "description should be less than 100 characters"})
         if(instructions.length>800) return res.status(201).json({message : "Instructions should not be more than 800 characters"});
         if(images.length>5) return res.status(201).json({message : "images cannot be more than 5 "});
         const newRecipe  = await Recipe.create({recipeName,description,instructions,images});
         return res.status(200).json({
            _id :newRecipe._id,
            recipeName : newRecipe.name,
            description :newRecipe.description,
            instructions : newRecipe.instructions,
            images: newRecipe.images
         })
    }catch(err){
        res.status(500).json({message : "internal server error"})
    }
}
