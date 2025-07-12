const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const{getAllrecipes,getRecipe,createRecipe} = require('../controllers/recipeController');
router.get('/recipes',protect,getAllrecipes);
router.get('/recipe/:name',protect, getRecipe);
router.post('/recipe',protect,createRecipe);


module .exports = router;