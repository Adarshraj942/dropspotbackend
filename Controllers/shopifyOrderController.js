import shopifyOrderModel from "../Models/shopifyOrderModel.js";
import UserModel from "../Models/userModel.js";
import nodemailer from "nodemailer"

export const create=async(req,res)=>{
    try {
        console.log("haiii");  
      
       const {dropshipperId,sellerId,productId,quantity}=req.body
       // const PreOrder=await shopifyOrderModel.findOne({userId:userId,sellerId:sellerId,preOrder:true,productId:productId})
        // console.log(PreOrder)

        // if(PreOrder){
        //   console.log("added");
        //      const data=await OrderModel.findByIdAndUpdate(PreOrder._id,{$inc:{quantity:quantity}})
        //       res.status(200).json(data)
        // }
       
          console.log("first");
          let newOrder= shopifyOrderModel(req.body)
          const Orders=await newOrder.save()
          console.log("orders",Orders);
        const address={
          address1:req.body.deliveryAddress.address1,
          city:req.body.deliveryAddress.city,
          state:req.body.deliveryAddress.state,
          post:req.body.deliveryAddress.post
         }
         await UserModel.findByIdAndUpdate({_id:dropshipperId},{ $addToSet:{address:address}},{new:true})
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
         
    } catch (error) {
        res.status(500).json(error)
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
      const {
        dropshipperId,type}=req.body
      console.log("haiii",dropshipperId,type);
    if(type=="shopify"){
      const orderlist1 =await shopifyOrderModel.find({
        dropshipperId:dropshipperId,pending:{$in:[true,false]},awaitingPayments:{$in:[true,false]},processing:{$nin:[true]}})
      console.log(orderlist1);
      const orderlist=orderlist1.reverse()
      res.status(200).json(orderlist)
    }else{
      const orderlist1 =await OrderModel.find({userId:userId})
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
      const orderlist1 =await OrderModel.find({sellerId:userId, preOrderFullfill:"PreOrderd",preOrder:true,preOrderFullfill:"Requested"})
      const orderlist=orderlist1.reverse()
      res.status(200).json(orderlist)
    }else{
      const orderlist1 =await OrderModel.find({sellerId:userId,preOrderFullfill:"Accepted"})
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
    const data=await OrderModel.findByIdAndUpdate(orderId,{preOrderFullfill:status})
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json(error)
  }
}