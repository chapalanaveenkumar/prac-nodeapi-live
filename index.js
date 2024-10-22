const express=require("express");
const morgan=require("morgan");
const dotenv=require("dotenv");
const { connectdb } = require("./databaseconnection");

connectdb();
dotenv.config();
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('combined')) // combined refers to the format of the tracing .dev includes colors and all ,this combined is for detailed information like user ,receiver.


app.listen(process.env.port,()=>{
    console.log(`Server is created and its adderess is http://localhost:${process.env.port}`);
})


