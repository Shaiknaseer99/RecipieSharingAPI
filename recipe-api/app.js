const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes")
const connectDb = require('./config/db');

app.use(express.json());
connectDb();

app.use('/api/auth', authRoutes);
app.get('/',(req,res)=>{
    res.send("recipie sharing API")
})
module.exports = app;

