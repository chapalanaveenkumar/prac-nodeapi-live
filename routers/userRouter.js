const userRouter=require("../controllers/usercontroller");
const express=require("express");
const router=express.Router();
const validators=require("../validators/validateToken");

router.get("/",validators.validateToken,userRouter.getAllUsers);
router.post("/",userRouter.userSignUp);
router.put("/:id",userRouter.updateUser);
router.post("/login",userRouter.loginUser);
router.delete("/:id",userRouter.deleteUser);

module.exports=router;
