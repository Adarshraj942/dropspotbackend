import productModel from "../Models/productModel.js"
import OrderModel from "../Models/OrderModel.js";
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
        const data=await OrderModel.findOne({ shopifyOrderId: shopifyOrderId})
        if(data){
            res.status(401)
              
        }else{
            res.status(200).json({message:"order not found"})
        }
    } catch (error) {
        res.status(500).json(error)
    }
}