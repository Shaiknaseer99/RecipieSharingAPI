const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes")
const recipeRoutes = require("./routes/recipeRoutes")
const userRoutes = require('./routes/userRoutes')



const connectDb = require('./config/db');

app.use(express.json());
connectDb();

app.use('/api/auth', authRoutes);
app.use('/api',recipeRoutes);
app.use('/api',userRoutes);
app.get('/',(req,res)=>{
    res.send("recipie sharing API")
})
module.exports = app;

