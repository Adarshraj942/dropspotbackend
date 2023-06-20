import preOrderModel from "../Models/PreOrderModel.js";
import UserModel from "../Models/userModel.js";
import nodemailer from "nodemailer"

export const create=async(req,res)=>{
    try {
        console.log("haiii");  
      
       const {userId,sellerId,productId,quantity}=req.body
        const PreOrder=await preOrderModel.findOne({userId:userId,sellerId:sellerId,preOrder:true,productId:productId})
        console.log(PreOrder)

        if(PreOrder){
          console.log("added");
             const data=await preOrderModel.findByIdAndUpdate(PreOrder._id,{$inc:{quantity:quantity}})
              res.status(200).json(data)
        }
         else{
          console.log("first");
          let newOrder=preOrderModel(req.body)
          const Orders=await newOrder.save()
        const address={
          address1:req.body.deliveryAddress.address1,
          city:req.body.deliveryAddress.city,
          state:req.body.deliveryAddress.state,
          post:req.body.deliveryAddress.post
         }
         await UserModel.findByIdAndUpdate({_id:userId},{ $addToSet:{address:address}},{new:true})
         var Transport=nodemailer.createTransport({
          service:"Gmail",
          auth:{
            user:"huzaif36@gmail.com",
            pass:"svonuqcjungprnhj"
          }
        })
        console.log(req.body);
        var mailOptions;
        let sender="Dropspot"
        mailOptions={
            from:sender,
            to:req.body.deliveryAddress.email,
  
            subject:`ORDER PLACED fROM ${Orders.deliveryAddress.firstName} ${Orders.deliveryAddress.lastName}`,
            text:`
            OrderId : ${Orders._id}\n
  
            UserId : ${Orders.userId}\n
  
            ProductId : ${Orders.productId}\n
            Postal code : ${Orders.deliveryAddress.post}\n
            State : ${Orders.deliveryAddress.state}\n
            City : ${Orders.deliveryAddress.city}\n
            Email : ${Orders.deliveryAddress.email}\n
            Mobile : ${Orders.deliveryAddress.mobile}\n
            Address : ${Orders.deliveryAddress.address1}\n
  
            Price : ${Orders.price}\n
            PaymentMod : ${Orders.paymentMod}
  
  
            
            `
           
        }
        Transport.sendMail(mailOptions,(err,response)=>{
          if(err){
            console.log(err);
          }else{
            console.log(response);
        }
        })
         res.status(200).json({Orders}) 
         }
    } catch (error) {
        
    }
}


export const edit=async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}


export const cancel=async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}

export const myOrders=async(req,res)=>{
    try {
      const {userId,type,status}=req.body
      
    if(type=="preOrder"&& status=="Declined"){
      const orderlist1 =await preOrderModel.find({userId:userId,preOrder:true,preOrderFullfill:"Declined"})
      const orderlist=orderlist1.reverse()
      res.status(200).json(orderlist)
    }else{
      const orderlist1 =await preOrderModel.find({userId:userId})
      const orderlist=orderlist1.reverse()
      res.status(200).json(orderlist)
    }
    } catch (error) {
       res.status(500).json(error) 
    }
}


export const sellerOrders=async(req,res)=>{
  try {
    const {userId,type}=req.body
    console.log(type);
    if(type=="preOrder"){
      const orderlist1 =await preOrderModel.find({sellerId:userId, preOrderFullfill:"PreOrderd",preOrder:true})
      const orderlist=orderlist1.reverse()
      res.status(200).json(orderlist)
    }else{
      const orderlist1 =await preOrderModel.find({sellerId:userId})
      const orderlist=orderlist1.reverse()
      res.status(200).json(orderlist)
    }
  } catch (error) {
     res.status(500).json(error) 
  }
}

export const preOrderFullfill=async(req,res)=>{
  try {
    const {orderId,status}=req.body
    const data=await preOrderModel.findByIdAndUpdate(orderId,{preOrderFullfill:status})
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const PreOrdercheck=async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}