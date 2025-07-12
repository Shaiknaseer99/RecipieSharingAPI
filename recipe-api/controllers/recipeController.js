const Recipe = require("../models/Recipe")
const User = require("../models/User")

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
         const newRecipe  = await Recipe.create({recipeName,description,instructions,images,createdBy: req.user._id});
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
exports.deleteRecipe = async(req,res)=>{
    try{
        const {id}  = req.params;
        const recipeItem = await Recipe.findByIdAndDelete(id);
        if(!recipeItem) return res.status(400).json({message : "no item found "});
        return res.status(200).json({message : 'Recipe deleted Successfully'})
    }catch(err){
        res.status(500).json({message: "internal server error"})
    }
}
exports.updateRecipe = async(req,res)=>{
    try{
       const {id} = req.params;
       const {recipeName,description, instructions, images} = req.body;
       const recipe = await Recipe.findById(id);
       if(!recipe) return res.status(400).json({message : "no such recipe found , please check it "});
       recipe .recipeName = recipe.recipeName ||  recipeName;
       recipe.description  = recipe.description || description;
       recipe.instructions  = recipe.instructions || instructions;
       recipe . images =  recipe.images || images;

       await recipe.save();
        return res.status(200).json({
            message : "recipe updated successfully",
            _id : recipe._id,
            recipeName : recipe.recipeName,
            description : recipe.description,
            instructions : recipe.instructions,
            images  : recipe.images
        })
    }catch(err){
        res.status(500).json({message : "internal server error"})
    }
}
exports.saveRecipe = async(req,res)=>{
    try{
        const userId  = req.user._id;
        const {recipeId} = req.body;
        if(!recipeId) return res.status(400).json({message:"recipeId is required"});
        const recipe  = await Recipe.findById(recipeId);
        if(!recipe) return res.status(400).json({message :"recipe not found"});

        const user = await User.findById(userId);
        if(user.savedRecipes.includes(recipeId)){
            return res.status(200).json({message:"Recipe already saved"});
        }
       user.savedRecipes.push(recipeId);
       await user.save();
       res.status(200).json({message : "recipe saved successfully"});

    }catch(err){
        console.error(err)
        res.statuts(500).json({message:"Internal server error"})
    }
}
exports.getSavedRecipes = async(req,res)=>{
    try{ 
        
        const userId = req.user._id;
       
       const user  = await User.findById(userId).populate("savedRecipes");
        if (!user) {
           return res.status(404).json({ message: "User not found" });
       }
       return res.status(200).json({savedRecipes  : user.savedRecipes});
    }catch(err){
        console.error(err);
        res.status(500).json({message : "Internal server error"})
    }
}