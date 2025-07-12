const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const{getAllrecipes,getRecipe,createRecipe, deleteRecipe,updateRecipe} = require('../controllers/recipeController');
router.get('/recipes',protect,getAllrecipes);
router.get('/recipe/:name',protect, getRecipe);
router.post('/recipe',protect,createRecipe);
router.delete('/recipe/:id',protect,deleteRecipe)
router.put('/recipe/:id',protect,updateRecipe);

module .exports = router;