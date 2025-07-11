const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connectDb = async()=>{
      try{
       
         await mongoose.connect(process.env. MONGO_URI)
         console.log("Mongo DB Connected");
         
      }catch(err){
        console.error(`error in connecting to the databse : ${err}`)
        process.exit(1);
      }
}

//we have to export the function as well
module.exports = connectDb;