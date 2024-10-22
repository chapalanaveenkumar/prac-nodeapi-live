const mongoose=require("mongoose");
const dotenv=require("dotenv");
dotenv.config();
const connectdb=async ()=>{
    try{
        await mongoose.connect(process.env.mongodburl);
        console.log("Databse connected !.")
    }catch(error){
        console.log(`Error while connecting database:${error}`);
    }
}

module.exports={connectdb};