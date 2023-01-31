import AdminModel from "../Models/AdminMOdel.js"
 import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
export const adminLogin =async(req,res)=>{
    const {username,password}=req.body;
    console.log(username,password)
  
    try {
       const admin=await AdminModel.findOne({username: username})
       console.log(admin.password)
       if(admin){
        const validity=await bcrypt.compare(password, admin.password)

       if(!validity){
          res.status(400).json("Wrong password")
       }else{
        const token=jwt.sign({
            username:admin.username, id:admin._id
         },process.env.JWT_KEY,{expiresIn:'1h'})

         res.status(200).json({admin,token})
       }
    }
    else{
        res.status(404).json("User does not exist")
    }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}