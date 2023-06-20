import UserModel from "../Models/userModel.js";

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import userWalletModel from "../Models/userWalletModel.js";
import Twilio from "twilio";

const serviceID = "VA07b529d4786c4c749a133ac423b1893f"            
const accountSID =  "ACd0f87bcfd1bcfd66cdda0e623ed13473"
const authToken = "18973808512f21b045bddb9e84f2e9c9"
const client = new Twilio(accountSID, authToken);

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
     
     const wallet=userWalletModel({ownerId:user._id})
        await wallet.save()
        const token = jwt.sign(
          {
            username: user.username,
            id: user._id,
          },
          process.env.JWT_KEY,
          { expiresIn: "168h" }
        );


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


//for sending otp
export const otpValidation = async (req, res) => {
   try {
 
     console.log(req.body.number);
     const resp = await client.verify.services(serviceID).verifications.create({
       to: `+91${req.body.number}`,
       channel: "sms",
     });
     if(resp){
      console.log(resp);
     }else{
      console.log("no resp");
     }
     res.status(200).json(resp);
   } catch (error) {
     res.status(500).json(error);
   }
 };
 //for verifying otp
 export const otpVerification = async (req, res) => {
   try {
     const { otp, number } = req.body;
     const resp = await client.verify
       .services(serviceID)
       .verificationChecks.create({
         to: `+91${number}`,
         code: otp,
       });
     console.log(resp);
     res.status(200).json(resp);
   } catch (error) {
     res.status(500).json(error);
   }
 };
 