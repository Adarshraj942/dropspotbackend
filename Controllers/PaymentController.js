import userWalletModel from "../Models/userWalletModel.js";

export const cashIn=async(req,res)=>{
    try {
        const {userId,amount,orderId}=req.body;
        await userWalletModel.findOneAndUpdate ({ownerId:userId},{$inc:{  creditedAmount:amount},$set:{transactions:orderId}},{new:true})
         res.status(200).json("amount credited to user wallet successfully")
    } catch (error) {
        res.status(500).json(error)
    }
}

export const cashOut=async(req,res)=>{
    try {
        const {userId,amount}=req.body;
        await userWalletModel.findOneAndUpdate ({ownerId:userId},{$inc:{ creditedAmount:-amount}},{new:true})
         res.status(200).json("amount credited to user account successfully")
    } catch (error) {
        res.status(500).json(error)
    }
}


