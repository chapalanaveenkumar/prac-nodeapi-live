const mongoose=require("mongoose");
require("dotenv").config();

const tokenList=new mongoose.Schema({
    token:{type:String,required:true},
});

const Token=mongoose.model("tokensCollection",tokenList);
module.exports=Token;
