import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

//registering a new user
export const registerUser=async (req,res)=>{
  console.log("haiii")  
   const salt=await bcrypt.genSalt(10)
   const hashedPass= await bcrypt.hash(req.body.password,salt)
   req.body.password=hashedPass
   const newUser =UserModel(req.body)
   const {email}=req.body
   try {


    const oldUser=await UserModel.findOne({email})
    if(oldUser){
        return res.status(400).json({message:"username already exist"})
    }
     const user= await newUser.save();
     const token=jwt.sign({
        username:user.email, id:user._id
     },process.env.JWT_KEY,{expiresIn:'1h'})
     res.status(200).json({user,token});
   } catch (error) {
      res.status(500).json({message:error.message})
   }
}

//login User

export const loginUser= async(req,res)=>{
    const {email,password}=req.body;

  
    try {
       const user=await UserModel.findOne({email: email})
       console.log(user.password)
       if(user){
        const validity=await bcrypt.compare(password, user.password)

       if(!validity){
          res.status(400).json("Wrong password")
       }else if(user.auth===false){
         console.log(user.auth)
         res.status(401).json("Action forbidden")
       }
       else{
        const token=jwt.sign({
            username:user.email, id:user._id
         },process.env.JWT_KEY,{expiresIn:'1h'})

         res.status(200).json({user,token})
       }
    }
    else{
        res.status(404).json("User does not exist")
    }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}