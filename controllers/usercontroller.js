const User=require("../databasecollections/userscollection");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const mongoose=require("mongoose");
const Token=require("../databasecollections/tokenscollection");
require("dotenv").config();

const getAllUsers=async (req,res)=>{
    try{
        const users= await User.find();
        res.status(200).json({users});
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

const userSignUp=async (req,res)=>{
    const body=req.body;
    const hashedPassword=await bcrypt.hash(body.password,4);
    const newUser= new User({
        username:body.username,
        email:body.email,
        password:hashedPassword
    });

    try{
        await newUser.save();
        res.status(200).json({
            username:body['username'],
            email:body['email'],
            password:hashedPassword
        });
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

const updateUser=async (req,res)=>{
    const id=req.params.id;
    const body=req.body;
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //     return res.status(400).json({ message: "Invalid ID format" });
    // }
    
    try{
        const updatedData=await User.findByIdAndUpdate(id,body,{ new: true, runValidators: true ,context:'query'});
        res.status(202).json(updatedData);
    }catch(error){
        res.status(500).json({message:error.message});
    }
    
}

const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    console.log('Email:', email, 'Password:', password);

    try{
        const emailVerify=await User.findOne({email});
        console.log(emailVerify.password);
        if(!emailVerify){
            res.status(404).json(`Your email id: ${email} is not registered so please register`)
        }else{
            const checkPassword= await bcrypt.compare(password,emailVerify.password);
            console.log(checkPassword);
            if(!checkPassword){
                res.status(401).json(`Invalid password please enter correct password`);
            }
            else{
                const token=await jwt.sign({user:checkPassword._id},process.env.secretKey,{expiresIn:'2h',algorithm:'HS512'});
                await Token.create({token});
                res.status(200).json({ email: email,  token:token,message: "Successfully Llogin or verifeid" });
            }
        }
    }
    catch(error){
        res.status(500).json({message:error.message});
    }

}

const deleteUser=async(req,res)=>{
    const id=req.params.id;
    try{
        const isdeleted= await User.findByIdAndDelete(id);
        if(isdeleted) res.status(200).json("Data is deleted");
        else res.status(404).json(`data not found`);

    }catch(error){
        res.status(500).json({message:error.message});
    }
}


module.exports={getAllUsers,userSignUp,updateUser,loginUser,deleteUser};
