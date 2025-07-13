const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const{getAllrecipes,getRecipe,createRecipe, deleteRecipe,updateRecipe,saveRecipe,getSavedRecipes,rateRecipe,giveFeedback} = require('../controllers/recipeController');
router.get('/recipes',protect,getAllrecipes);
router.get('/recipe/:name',protect, getRecipe);
router.post('/recipe',protect,createRecipe);
router.delete('/recipe/:id',protect,deleteRecipe)
router.put('/recipe/:id',protect,updateRecipe);
router.post('/recipe/save',protect,saveRecipe);
router.get('/recipes/saved',protect,getSavedRecipes);
router.post('/recipe/rating',protect , rateRecipe)
router.post('/recipe/feedback',protect,giveFeedback);

module .exports = router;