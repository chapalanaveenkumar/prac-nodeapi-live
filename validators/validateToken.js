const Token=require("../databasecollections/tokenscollection");
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");
dotenv.config();


const validateToken=async (req,res,next)=>{
    const token=await req.headers['authorization'].split(" ")[1];
    // const checkInDb=await Token.findOne({token});
    // if(!checkInDb) res.status(404).json(`No token found`);
    // else{
        try{
            const isVerified=await jwt.verify(token,process.env.secretKey);
            if(isVerified) next();
            else res.status(404).json(`Invalid token or secretKey`);
        }catch(error){
            res.status(500).json(`Server error`);
        }
    }
    
//}

module.exports={validateToken};