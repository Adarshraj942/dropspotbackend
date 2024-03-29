import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import userWalletModel from "../Models/userWalletModel.js";
//get all users
export const addDropshipperUrl=async(req,res)=>{
  try {
    const {urls,dropshipperId}=req.body
    const data=await UserModel.findByIdAndUpdate({_id:dropshipperId},{$addToSet:{storeUrl:urls}},{new:true})
    res.status(200).json({data})
  } catch (error) {
    res.status(500).json(error)
  }
}
export const getUserWallet=async(req,res)=>{

    const {userId}=req.body
        try {
            const wallet=await userWalletModel.findOne({ownerId:userId})
            let totalUSable=wallet.winningAmount+wallet.userAddedAmount+wallet.defaultAmount
            const data= await userWalletModel.findOneAndUpdate ({ownerId:userId},{$set:{totalUsableAmount:totalUSable}},{new:true})
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json(error)
        }
    } 
export const removeDropshipperUrl=async(req,res)=>{
    try {
      const {urls,dropshipperId}=req.body
      const data=await UserModel.findByIdAndUpdate({_id:dropshipperId},{$pull:{storeUrl:urls}},{new:true})
      res.status(200).json({data})
    } catch (error) {
      res.status(500).json(error)
    }
  }
export const getAllUser=async (req,res)=>{
    try {
       let users=await UserModel.find() 

       users=users.map((user)=>{
          const {password,...otherDetails}=user._doc
           return otherDetails
       })
       res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
}

//get a user

export const getUser=async (req,res)=>{
    const id=req.params.id
    console.log(id);
    try {
        
        const user=await UserModel.findById(id)
        if(user)
        {
            const {password,...otherDetails}=user._doc
             console.log(otherDetails);

            res.status(200).json(otherDetails)
        }
        else
        {
            res.status(404).json("No such user found")
        }
        
    } catch (error) {
         res.status(500).json(error)
    }
}

//update a user

export const updateUser=async(req,res)=>{

    const id=req.params.id;
    const {_id,currentUserAdminStatus,password}=req.body;
     
   


    if(id===_id ){
        try {

            if(password)
            {
              const salt =await bcrypt.genSalt(10)
              req.body.password= await bcrypt.hash(password,salt) 
            }
           const user =await UserModel.findByIdAndUpdate(id,req.body,{new:true})

          const token=jwt.sign({
            username:user.username,
            id:user._id
          },process.env.JWT_KEY,{expiresIn:"1h"})
           res.status(200).json({user,token})


        } catch (error) {
            res.status(500).json(error) 
        }
    }else{
        res.status(403).json("Access denied ! you can update only ypur own profile")
    }
}

export const deleteUser=async (req,res)=>{
    const id=req.params.id;
    const  {currentUserId,currentUserAdminStatus}=req.body;
    if(currentUserId===id || currentUserAdminStatus){
       try {
          await UserModel.findByIdAndDelete(id)
          res.status(200).json("User deleted successfully")
       } catch (error) {
        res.status(500).json(error) 
        
       }
    }
    else{
        res.status(403).json("Access denied ! you can delete only ypur own profile")
    }
}

export const followUser=async (req,res)=>{
    const id =req.params.id
    const {_id}=req.body;

    if(_id===id){
        res.status(403).json("Action Forbidden")
    }else{
        try {
           const followUser=await UserModel.findById(id) 
           const followingUser=await UserModel.findById(_id)
           if(!followUser.followers.includes(_id)){
               await followUser.updateOne({$push:{followers:_id}})
               await followingUser.updateOne({$push:{following:id}})
               res.status(200).json("user followed")
           }else{
            res.status(403).json("User Already folowed by you")
           }
        } catch (error) {
            console.log(error)
            res.status(500).json(error)  
        }
    }
}
//unfollow user
export const unFollowUser=async (req,res)=>{
    const id =req.params.id
    const {_id}=req.body;

    if(_id===id){
        res.status(403).json("Action Forbidden")
    }else{
        try {
           const followUser=await UserModel.findById(id) 
           const followingUser=await UserModel.findById(_id)
           if(followUser.followers.includes(_id)){
               await followUser.updateOne({$pull:{followers:_id}})
               await followingUser.updateOne({$pull:{following:id}})
               res.status(200).json("user unfollowed")
           }else{
            res.status(403).json("User is not folowed by you")
           }
        } catch (error) {
            res.status(500).json(error)  
        }
    }
}

export const blockUser=async(req,res)=>{
    const userId=req.params.id
    try {
        const user=await UserModel.findByIdAndUpdate({_id:userId},{
            auth:false
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const UnblockUser=async(req,res)=>{
    const userId=req.params.id
    try {
        const user=await UserModel.findByIdAndUpdate({_id:userId},{
            auth:true
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}


export const getconnectedshops=async(req,res)=>{
    try {
       const {userId}=req.body 
       const data=await UserModel.findById(userId)
       const stores=data.storeUrl
       res.status(200).json(stores)
    } catch (error) {
        res.status(500).json(error)
    }
}