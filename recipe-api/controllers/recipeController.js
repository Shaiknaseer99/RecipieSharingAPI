const { response } = require("express");
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
exports.rateRecipe = async(req,res)=>{
    try{
        const userId = req.user._id;
        const{recipeId,rating} = req.body;
        if(!recipeId || !rating ) return res.status(400).json({message : "recipeId and rating is required"});
        const recipe = await Recipe.findById(recipeId)
        if(!recipe) return res.status(400).json({message : "Recipe did not found , please check it"})        
        if(rating<1 || rating >5) return res.status(400).json({message : "Rating should be greater than 0 and less than 6"});
       
        const alreadyRatedIndex = recipe.ratings.findIndex(r=>r.user.toString()===userId.toString());
        if(alreadyRatedIndex!==-1){
          
            recipe.ratings[alreadyRatedIndex].value = rating;

        }
        else{
            recipe.ratings.push({user:userId,value : rating});
        }
        await recipe.save();
        return res.status(200).json({message : "Rating added successfully.."})
    }catch(err){
        res.status(500).json({message : "internal server error"})
    }
}
exports.giveFeedback = async(req,res)=>{
    try{
      const userId = req.user._id;
      const {recipeId, feedback} = req.body;
      if(!recipeId || !feedback) return res.status(400).json({message:"recipeId and feedback is requried"});
      const recipe = await Recipe.findById(recipeId);
      if(!recipe) return res.status(400).json({message:"Recipe is not found"});
      if(feedback.length<20 || feedback.length>50) return res.json({message : 'the feedback should be greater than 20 and lesser than 50'})
      const alreadyGivenFeedback = recipe.feedbacks.findIndex(f =>f.user.toString()===userId.toString());
      if(alreadyGivenFeedback!==-1){
        recipe.feedbacks[alreadyGivenFeedback].value = feedback;

      }
      else{
        recipe.feedbacks.push({user:userId,value : feedback});
      }
      await recipe.save();
      return res.status(200).json({message : "feedback provided successfully"});
    }catch(err){
        console.error(err);
        res.status(500).json({message :"Internal server error"})
    }
}
exports.leaveComment = async(req,res)=>{
    try{
        const userId = req.user._id;
        const{recipeId , comment} = req.body;
        if(!recipeId || !comment) return res.status(400).json({message : "both recipeId and comment are required"});
        const recipe  = await Recipe.findById(recipeId);
        if(!recipe) return res.status(400).json({message :"Recipe not found"})
        if(comment.length<10 && comment.length>50) return res.status(400).json({message:"comment should be between 10 and 50 characters"})
        const user = await User.findById(userId);
        const alreadyCommentIndex = recipe.commnets.findIndex(c=>c.user.toString()===userId.toString());
        if(alreadyCommentIndex!==-1){
            recipe.commnets[alreadyCommentIndex] = comment;
        }else{
            recipe.commnets.push({user:userId, value : comment});
        }
        await recipe.save(); 
        return res.status(200).json({message : "comment added successfully"});

    }catch(err){
        console.error(err)
        return res.status(500).json({message:"internal server error"})
    }
}
exports.shareRecipe = async(req,res)=>{
   const userId = req.user._id;
   const{recipeId } = req.body;
   if(!recipeId) return res.status(400).json({message :"Recipe Id must be provided"});
   const recipe = await Recipe.findById(recipeId);
   const user = await User.findById(userId);
   if(!recipe) return res.status(400).json({message :"Recipe did not found"});
   if(user.sharedRecipes.includes(recipeId)) return res.status(400).json({message : "you have already shared the recipe"});
   user.sharedRecipes.push(recipeId);
   await user.save();
   return res.status(200).json({message:"Recipe shared successfully"});

}
exports.getSharedRecipes = async(req,res)=>{   
    const userId = req.user._id;
    const user = await User.findById(userId).populate("sharedRecipes")

    return res.status(200).json({sharedRecipes:user.sharedRecipes});

}
exports.filterRecipes = async(req,res)=>{
     try{
       const {tags} = req.query;
        const tagsArray = tags ?tags.split(','):[];
        const filter = tagsArray.length>0 ? {tags :{$in:tagsArray}}:{};
        const recipes = await Recipe.find(filter);
        return res.status(200).json({recipes});

     }catch(err){
        console.error(err);
        return res.status(400).json({message : "internal server error"})
     }
}