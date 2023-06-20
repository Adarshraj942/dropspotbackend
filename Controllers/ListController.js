import productModel from "../Models/productModel.js"
import shopifyOrderModel from "../Models/shopifyOrderModel.js";
import UserModel from "../Models/userModel.js";
export const checksku=async(req,res)=>{
    try {
        const {sku}=req.body
        const data=await productModel.findOne({sku:sku})
        if(data){
              res.status(200).json({message:"product found"})
        }else{
            res.status(401)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

export const checkOrder=async(req,res)=>{
    try {
        const { shopifyOrderId}=req.body
        const data=await shopifyOrderModel.findOne({ shopifyOrderId: shopifyOrderId})
        if(data){
            res.status(401)
              
        }else{
            res.status(200).json({message:"order not found"})
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

export const addtoListingArray=async(req,res)=>{
    try {
        const {product,dropshipperId}=req.body
        const data=await UserModel.findByIdAndUpdate({_id:dropshipperId},{$addToSet:{beforeListing:product}},{new:true})
        res.status(200).json({data})
    } catch (error) {
        res.status(500).json(error)
    }
}

export const afterListingArray=async(req,res)=>{
    try {
        const {product,dropshipperId}=req.body
        const dataz=await UserModel.findByIdAndUpdate({_id:dropshipperId},{$pull:{beforeListing:product}},{new:true})
        const data=await UserModel.findByIdAndUpdate({_id:dropshipperId},{$addToSet:{afterListing:product}},{new:true})
        res.status(200).json({data})
    } catch (error) {
        res.status(500).json(error)
    }
}

