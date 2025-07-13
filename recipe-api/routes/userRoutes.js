const express = require("express");
const router = express.Router();
const protect =require('../middlewares/authMiddleware');
const {getAllUsers,followUser} = require('../controllers/userController')

router.get('/users',protect,getAllUsers);
router.post('/users/follow',protect,followUser)
module.exports  =router;