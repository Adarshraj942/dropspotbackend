import OrderModel from "../Models/OrderModel.js";
import UserModel from "../Models/userModel.js";
import nodemailer from "nodemailer"
import shopifyOrderModel from "../Models/shopifyOrderModel.js";
import preOrderModel from "../Models/PreOrderModel.js";
import request from "request";
import ShippingModel from "../Models/shippingModel.js";

export const create=async(req,res)=>{
    try {
        console.log("haiii");  
      
     //  const {userId,sellerId,productId,quantity}=req.body
 
          console.log("first");

          const {shipping,...others}=req.body
          let newOrder=OrderModel(others)
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
      const orderlist1 =await OrderModel.find({userId:userId,preOrder:true,preOrderFullfill:"Declined"})
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

export const reqreturn=async(req,res)=>{
  try {
    const {orderId,status}=req.body
    const statz=rto?!status:status
     const stat= !status
    const data=await OrderModel.findByIdAndUpdate(orderId,{returnreq:statz})
    if(!data){
      const data=await shopifyOrderModel.findByIdAndUpdate(orderId,{returnreq:statz,return:false},{new:true})
              
      res.status(200).json(data)
    
    }else{
      const data=await shopifyOrderModel.findByIdAndUpdate(orderId,{returnreq:statz,return:false},{new:true})
      res.status(200).json(data)
    }
  } catch (error) {
    res.status(500).json(error)
  }
}


export const Acceptreturn=async(req,res)=>{
  try {
    const {orderId,status}=req.body
    const statz=rto?!status:status
     const stat= !status
    const data=await OrderModel.findByIdAndUpdate(orderId,{returnreq:statz})
    if(!data){
      const data=await shopifyOrderModel.findByIdAndUpdate(orderId,{returnreq:statz,return:true},{new:true})
              
      res.status(200).json(data)
    
    }else{
      const data=await shopifyOrderModel.findByIdAndUpdate(orderId,{returnreq:statz,return:true},{new:true})
      res.status(200).json(data)
    }
  } catch (error) {
    res.status(500).json(error)
  }
}
export const allreturn =async(req,res)=>{
    try {
      const {status,rto}=req.body
      console.log(req.body)
      const stat=rto?!status:status
      const ata=await OrderModel.find({return:stat})
         
      console.log("ata",ata);
        const ataz=await shopifyOrderModel.find({return:stat})
        console.log("ataz",ataz);
        const data=[...ata,...ataz]
        res.status(200).json(data)
    } catch (error) {
      res.status(500).json(error)
    }
}


export const allRto=async(req,res)=>{
  try {
   const {awb}=req.body
   const token=await ShippingModel.find()
   const Tok=token[0].token
   var options = {
      url: `https://shipment.xpressbees.com/api/shipments2/track/${awb}`,
      method: 'GET',
      json: opt,
      headers: {
        'User-Agent': 'my request',
        'Authorization': `Bearer ${Tok}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };
  
    var callback = async(error, response, body) => {
      console.log(body);
      console.log(response.statusCode);
      if(body.data.history[0].statusCode=="DL"){
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


      }
      else if(body.data.history[0].statusCode=="RT-DL"){
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
      }
      else{
        res.status(response.statusCode).json(body.data)
      }
  
    }
  
  
        const result = await request(options, callback);;
        console.log(result);
  } catch (error) {
    res.status(500).json(error)
  }
}

export const allreturnreq =async(req,res)=>{
  try {
    const {status,rto}=req.body
    console.log(req.body)
    const stat=rto?!status:status
    const ata=await OrderModel.find({returnreq:stat})
       
    console.log("ata",ata);
      const ataz=await shopifyOrderModel.find({returnreq:stat})
      console.log("ataz",ataz);
      const data=[...ata,...ataz]
      res.status(200).json(data)

  } catch (error) {
    res.status(500).json(error)
  }
}



export const allclosed =async(req,res)=>{
try {
  const {status,rto}=req.body
  console.log(req.body)
  const stat=rto?!status:status
  const ata=await OrderModel.find({closed:stat})
     
  console.log("ata",ata);
    const ataz=await shopifyOrderModel.find({closed:stat})
    console.log("ataz",ataz);
    const data=[...ata,...ataz]
    res.status(200).json(data)
    } catch (error) {
      res.status(500).json(error)
    }
}

export const allcomplete =async(req,res)=>{
  try {

    const {status,rto}=req.body
    const stat=rto?!status:status

    const ata=await OrderModel.find({processing:stat})

    const dis=[];
 
   var zor=new Promise((resolve, reject) => {
   if(ata.length>0){
    ata.forEach((ele)=>{
      const awb=ele.shipping.awb_number
      const url= `https://shipment.xpressbees.com/api/shipments2/track/${awb}`
      var options = {
       url: url,
       method: 'GET',

       headers: {
         'User-Agent': 'my request',
         'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2ODY4ODM3NjUsImp0aSI6InJiZDFrRGU0SXFjOGJNOFBsWTVzekljOHd4ZmFpM3VXeUpidnhJbjZPTU09IiwibmJmIjoxNjg2ODgzNzY1LCJleHAiOjE2ODY4OTQ1NjUsImRhdGEiOnsidXNlcl9pZCI6IjY0OTMxIiwicGFyZW50X2lkIjoiMCJ9fQ.dVozjKYTRTUlVPF8YySwlg6Hwkn6UnpNj6a4xjtymXyb0oxlDNMpoHtQug7DsLT32gbQDVZQRAOe6y7SaYyRkQ',
         'Content-Type': 'application/json',
         'Accept': 'application/json'
       }
     };
   
   
     
     var callback = async(error, response, body) => {
  
       
       const sys=JSON.parse(`${body}`)

       sys?.data?.status=="Delivered"?dis.push(ele):""
        if(sys.data.status=="Delivered"){
          await OrderModel.findByIdAndUpdate(ele._id,{closed:stat})
        }
       // console.log("ele1",bis);
       //   if(sys.data.status=="pending pickup"){
          
       //      bis.push(ele)
       //      console.log("ele",bis);
       //   }
       //  
          if (index === ataz.length -1) resolve();
     }
     const result =  request(options, callback);
    }) 
   }else{
       resolve(dis)
   }
 })
      const ataz=await shopifyOrderModel.find({processing:stat})

      const  bis=[]
  
console.log("ataz",ataz);
var bar= new Promise((resolve, reject) => {

if(ataz.length>0){
  ataz.forEach((ele,index,ataz)=>{

    const awb=ele.shipping.awb_number

   
    const url= `https://shipment.xpressbees.com/api/shipments2/track/${awb}`      
    var options = {
     url: url,
     method: 'GET',

     headers: {
       'User-Agent': 'my request',
       'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2ODY5ODczMTIsImp0aSI6IlEwempBdkJzUkNTaWl1eGx2RmNVZTdOa1g0OFhJK0dvbHRwSXdHRjFNOGs9IiwibmJmIjoxNjg2OTg3MzEyLCJleHAiOjE2ODY5OTgxMTIsImRhdGEiOnsidXNlcl9pZCI6IjY0OTMxIiwicGFyZW50X2lkIjoiMCJ9fQ.xONBvEkBau7DbDhQisoluq1BwMqNlg23NBXeiD_M6FydbfD0kU1W0A5bNtQA2CYsfMAhW4lNYCgl1Uw2LVvj1g',
       'Content-Type': 'application/json',
       'Accept': 'application/json'
     }
   };
 
   
   
   var callback =async(error, response, body) => {

    const sys=JSON.parse(`${body}`)
    sys?.data?.status=="Delivered"?bis.push(ele):""
    if(sys.data.status=="Delivered"){
      await OrderModel.findByIdAndUpdate(ele._id,{closed:stat})
    }
    if (index === ataz.length -1) resolve();

}

  request(options, callback);

  
  })
}else{
  resolve(bis)
}

})


       
  //  zor.then(()=>{
      
  //       })
     

  bar.then(()=>{
    console.log("ele2",bis);
    
     const data=[...bis,...dis]
     res.status(200).json(data)
  })
    
  } catch (error) {
    res.status(500).json(error)
  }
}

export const alldispatched =async(req,res)=>{
  try {

    const {status,rto}=req.body
    const stat=rto?!status:status

    const ata=await OrderModel.find({processing:stat})

    const dis=[];
 
   var zor=new Promise((resolve, reject) => {
   if(ata.length>0){
    ata.forEach((ele)=>{
      const awb=ele.shipping.awb_number
      const url= `https://shipment.xpressbees.com/api/shipments2/track/${awb}`
      var options = {
       url: url,
       method: 'GET',

       headers: {
         'User-Agent': 'my request',
         'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2ODY4ODM3NjUsImp0aSI6InJiZDFrRGU0SXFjOGJNOFBsWTVzekljOHd4ZmFpM3VXeUpidnhJbjZPTU09IiwibmJmIjoxNjg2ODgzNzY1LCJleHAiOjE2ODY4OTQ1NjUsImRhdGEiOnsidXNlcl9pZCI6IjY0OTMxIiwicGFyZW50X2lkIjoiMCJ9fQ.dVozjKYTRTUlVPF8YySwlg6Hwkn6UnpNj6a4xjtymXyb0oxlDNMpoHtQug7DsLT32gbQDVZQRAOe6y7SaYyRkQ',
         'Content-Type': 'application/json',
         'Accept': 'application/json'
       }
     };
   
   
     
     var callback = async(error, response, body) => {
  
    
       const sys=JSON.parse(`${body}`)

       sys?.data?.status=="In Transit"?dis.push(ele):""
    
       // console.log("ele1",bis);
       //   if(sys.data.status=="pending pickup"){
          
       //      bis.push(ele)
       //      console.log("ele",bis);
       //   }
       //  
       resolve()
     }
     const result =  request(options, callback);
    }) 
   }else{
       resolve(dis)
   }


   })
      const ataz=await shopifyOrderModel.find({processing:stat})

      const  bis=[]
  
console.log("ataz",ataz);
var bar= new Promise((resolve, reject) => {

if(ataz.length>0){
  ataz.forEach((ele,index,ataz)=>{

    const awb=ele.shipping.awb_number

   
    const url= `https://shipment.xpressbees.com/api/shipments2/track/${awb}`
    var options = {
     url: url,
     method: 'GET',

     headers: {
       'User-Agent': 'my request',
       'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2ODY4ODM3NjUsImp0aSI6InJiZDFrRGU0SXFjOGJNOFBsWTVzekljOHd4ZmFpM3VXeUpidnhJbjZPTU09IiwibmJmIjoxNjg2ODgzNzY1LCJleHAiOjE2ODY4OTQ1NjUsImRhdGEiOnsidXNlcl9pZCI6IjY0OTMxIiwicGFyZW50X2lkIjoiMCJ9fQ.dVozjKYTRTUlVPF8YySwlg6Hwkn6UnpNj6a4xjtymXyb0oxlDNMpoHtQug7DsLT32gbQDVZQRAOe6y7SaYyRkQ',
       'Content-Type': 'application/json',
       'Accept': 'application/json'
     }
   };
 
 
   
   var callback =(error, response, body) => {

    const sys=JSON.parse(`${body}`)
    sys?.data?.status=="In Transit"?bis.push(ele):""
    if (index === ataz.length -1) resolve();

}

  request(options, callback);

  
  })
}else{
  resolve(bis)
}

})


       
  //  zor.then(()=>{
      
  //       })
     

  bar.then(()=>{
    console.log("ele2",bis);
    
     const data=[...bis,...dis]
     res.status(200).json(data)
  })
    
  } catch (error) {
    res.status(500).json(error)
  }
}

export const allprocessing =async(req,res)=>{
  try {

  //   const url="https://shipment.xpressbees.com/api/shipments2"
  //   const opt= { 
  //     "order_number": "#001", 
  //     "shipping_charges": 40, 
  //     "discount": 100, 
  //     "cod_charges": 30, 
  //     "payment_type": req.body.shipping.payment_type, 
  //     "order_amount": req.body.shipping.order_amount, 
  //     "package_weight": req.body.shipping.package_weight, 
  //     "package_length":  req.body.shipping.package_length, 
  //     "package_breadth":  req.body.shipping.package_breadth, 
  //     "package_height":  req.body.shipping.package_height, 
  //     "request_auto_pickup" : "yes", 
  //     "consignee": { 
  //         "name":  req.body.shipping.consignee.name, 
  //         "address":  req.body.shipping.consignee.address, 
  //         "address_2":  req.body.shipping.consignee.address_2, 
  //         "city":  req.body.shipping.consignee.city, 
  //         "state":  req.body.shipping.consignee.state, 
  //         "pincode":  req.body.shipping.consignee.pincode, 
  //         "phone": req.body.shipping.consignee. phone
  //     }, 
  //     "pickup": { 
  //         "warehouse_name": req.body.shipping.pickup.warehouse_name, 
  //         "name" : req.body.shipping.pickup.name, 
  //         "address": req.body.shipping.pickup.address, 
  //         "address_2": req.body.shipping.pickup.address_2, 
  //         "city":  req.body.shipping.pickup.city, 
  //         "state": req.body.shipping.pickup.state, 
  //         "pincode": req.body.shipping.pickup.pincode, 
  //         "phone": req.body.shipping.pickup.phone
  //     }, 
  //     "order_items": [ 
  //         { 
  //             "name": req.body.shipping.order_items[0].name, 
  //             "qty":  req.body.shipping.order_items[0].qty, 
  //             "price": req.body.shipping.order_items[0].price, 
  //             "sku":  req.body.shipping.order_items[0].sku 
  //         } 
  //     ], 
  //     "courier_id" : req.body.shipping.courier_id, 
  //    "collectable_amount": req.body.shipping.collectable_amount
   
  // } 
  // var options = {
  //   url: url,
  //   method: 'POST',
  //   json: opt,
  //   headers: {
  //     'User-Agent': 'my request',
  //     'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2ODYxOTkxNDYsImp0aSI6IjlRUFNCSWVDXC9lWW5pR01mdDU3am5XUVZic3MzUlA5bWw0a2oxOEFacUMwPSIsIm5iZiI6MTY4NjE5OTE0NiwiZXhwIjoxNjg2MjA5OTQ2LCJkYXRhIjp7InVzZXJfaWQiOiI2NDkzMSIsInBhcmVudF9pZCI6IjAifX0.KNtbMFhMB3IHjL1MytZf4ARcaX5ooTQwSBUy0dcEryW9ccCL3V3ZIGXRgTxejKks9yKaredccBlj4VpWeD-VHA',
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json'
  //   }
  // };

  // var callback = (error, response, body) => {
  //   console.log(body);
  //   console.log(response.statusCode);
  //   res.status(response.statusCode).json(body.data)
  // }


  //     const result = await request(options, callback);;
  //     console.log(result);
    const {status,rto,orderId}=req.body
    const stat=rto?!status:status

    console.log(req.body)
    const ata=await OrderModel.find({processing:stat})
         
    console.log("ata",ata);
      const ataz=await shopifyOrderModel.find({processing:stat})
      console.log("ataz",ataz);
      const data=[...ata,...ataz]
      res.status(200).json(data)
  } catch (error) {
    res.status(500).json(error)
  }
}
export const allpending =async(req,res)=>{
  try {
    const {status,rto}=req.body
    console.log(req.body)
    const stat=rto?!status:status
    const ata=await OrderModel.find({pending:stat})
       
    console.log("ata",ata);
      const ataz=await shopifyOrderModel.find({pending:stat})
      console.log("ataz",ataz);
      const data=[...ata,...ataz]
      res.status(200).json(data)
   
  } catch (error) {
    res.status(500).json(error)
  }
}

export const allawaitingPayments =async(req,res)=>{
  try {
    const {status,rto}=req.body
    const stat=rto?!status:status
    console.log(req.body)
    const ata=await OrderModel.find({awaitingPayments:stat,processing:false})
         
    console.log("ata",ata);
      const ataz=await shopifyOrderModel.find({awaitingPayments:stat})
      console.log("ataz",ataz);
      const data=[...ata,...ataz]
      res.status(200).json(data)
  } catch (error) {
    res.status(500).json(error)
  }
}
export const requestpaymentstatus =async(req,res)=>{
  try {
    const {orderId,status,userId}=req.body

    const data=await OrderModel.findOne({userId:userId,awaitingpayments:true})

    const zeta={
      price:data.price,
      orderId:data._id,
      productId:data.productId,
      quantity:data.quantity
    }
    res.status(200).json({zeta})
  } catch (error) {
    res.status(500).json(error)
  }
}
export const changeclosestatus =async(req,res)=>{
  try {
    const {orderId,status,rto}=req.body
    const stat=rto?!status:status
    const data=await OrderModel.findByIdAndUpdate(orderId,{closed:stat})
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json(error)
  }
}
export const changecompletestatus =async(req,res)=>{
  try {
    const {orderId,status}=req.body
    const stat=rto?!status:status
    const data=await OrderModel.findByIdAndUpdate(orderId,{complete:stat})
    res.status(200).json(data)
    
  } catch (error) {
    res.status(500).json(error)
  }
}
export const changedispatchedstatus =async(req,res)=>{
  try {
    const {orderId,status,rto}=req.body
    const stat=rto?!status:status
    const data=await OrderModel.findByIdAndUpdate(orderId,{dispatched:status})
    res.status(200).json(data)
    
  } catch (error) {
    res.status(500).json(error)
  }
}

export const changeawaitingPaymentstatus =async(req,res)=>{
  try {
    console.log(req.body,"req body");
    const {orderId,status,rto}=req.body
    const data=await OrderModel.findByIdAndUpdate(orderId,{awaitingPayments:stat})
  
    
    if(!data){
      const data=await shopifyOrderModel.findByIdAndUpdate(orderId,{awaitingPayments:stat},{new:true})
      res.status(200).json(data)
    
    }else{
      res.status(200).json(data)
    }
    
  } catch (error) {
    res.status(500).json(error)
  }
}
export const changependingstatus =async(req,res)=>{
  try {
    const {orderId,status,quantity,sku,rto}=req.body
    const statz=rto?!status:status
     const stat= !status
    const data=await OrderModel.findByIdAndUpdate(orderId,{pending:statz})
    if(!data){
      const data=await shopifyOrderModel.findByIdAndUpdate(orderId,{pending:statz,awaitingPayments:stat},{new:true})
              await preOrderModel.findOneAndUpdate({sku:sku},{$inc:{quantity:-quantity}},{new:true})
      res.status(200).json(data)
    
    }else{
      res.status(200).json(data)
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

export const changeprocessingstatus =async(req,res)=>{
  try {
    const {orderId,status,rto}=req.body
    const stat=rto?!status:status
    const data=await OrderModel.findByIdAndUpdate(orderId,{processing:stat})
    if(!data){
    
         const url="https://shipment.xpressbees.com/api/shipments2"
    const opt= { 
      "order_number": "#001", 
      "shipping_charges": 40, 
      "discount": 100, 
      "cod_charges": 30, 
      "payment_type": req.body.shipping.payment_type, 
      "order_amount": req.body.shipping.order_amount, 
      "package_weight": req.body.shipping.package_weight, 
      "package_length":  req.body.shipping.package_length, 
      "package_breadth":  req.body.shipping.package_breadth, 
      "package_height":  req.body.shipping.package_height, 
      "request_auto_pickup" : "yes", 
      "consignee": { 
          "name":  req.body.shipping.consignee.name, 
          "address":  req.body.shipping.consignee.address, 
          "address_2":  req.body.shipping.consignee.address_2, 
          "city":  req.body.shipping.consignee.city, 
          "state":  req.body.shipping.consignee.state, 
          "pincode":  req.body.shipping.consignee.pincode, 
          "phone": req.body.shipping.consignee. phone
      }, 
      "pickup": { 
          "warehouse_name": req.body.shipping.pickup.warehouse_name, 
          "name" : req.body.shipping.pickup.name, 
          "address": req.body.shipping.pickup.address, 
          "address_2": req.body.shipping.pickup.address_2, 
          "city":  req.body.shipping.pickup.city, 
          "state": req.body.shipping.pickup.state, 
          "pincode": req.body.shipping.pickup.pincode, 
          "phone": req.body.shipping.pickup.phone
      }, 
      "order_items": [ 
          { 
              "name": req.body.shipping.order_items[0].name, 
              "qty":  req.body.shipping.order_items[0].qty, 
              "price": req.body.shipping.order_items[0].price, 
              "sku":  req.body.shipping.order_items[0].sku
          } 
      ], 
      "courier_id" : req.body.shipping.courier_id, 
     "collectable_amount": req.body.shipping.collectable_amount
   
  } 
  var options = {
    url: url,
    method: 'POST',
    json: opt,
    headers: {
      'User-Agent': 'my request',
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2ODY4MDI0OTUsImp0aSI6InMrR1JcL3REMkZVSmtOYkRMOGg0VTdqVTBWK1hzMVVvMUhoTlJxdklSNEhzPSIsIm5iZiI6MTY4NjgwMjQ5NSwiZXhwIjoxNjg2ODEzMjk1LCJkYXRhIjp7InVzZXJfaWQiOiI2NDkzMSIsInBhcmVudF9pZCI6IjAifX0.nlhfK23SxoIcioDnKDq645n6GdQB4FA81z9YjRh_GvZTRNdvTjkpVyrO4hAq96viDqq9CTJ5Oaj_GCdqlQqqkQ',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  var callback = async(error, response, body) => {
    console.log(body);
    console.log(response.statusCode);
    const shipping=body.data
    const data=await shopifyOrderModel.findByIdAndUpdate(orderId,{processing:stat,awaitingPayments:false,shipping:shipping},{new:true})
    res.status(response.statusCode).json(data)
  }


      const result = await request(options, callback);;
      console.log(result);       
      res.status(200).json(data)}
      else{
        res.status(200).json(data)
      }
    
  } catch (error) {
    res.status(500).json(error)
  }
}
export const changereturnstatus =async(req,res)=>{
  try {
    const {orderId,status,rto}=req.body
    const stat=rto?!status:status
    const data=await OrderModel.findByIdAndUpdate(orderId,{return:stat})
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json(error)
  }
}


export const addShippingCharge=async(req,res)=>{
  try {
    console.log(req.body,"req body");
    const {orderId,shippingCharge}=req.body
    const data=await OrderModel.findByIdAndUpdate(orderId,{shippingCharge:shippingCharge},{new:true})
  
    
    if(!data){
      const data=await shopifyOrderModel.findByIdAndUpdate(orderId,{shippingCharge:shippingCharge},{new:true})
      res.status(200).json(data)
    
    }else{
      res.status(200).json(data)
    }
    
  } catch (error) {
        res.status(500).json(error)
  }
}




export const allRtopickup=async(req,res)=>{
  try {

    const {status,rto}=req.body
    const stat=rto?!status:status

    const ata=await OrderModel.find({processing:stat})

    const dis=[];
 
   var zor=new Promise((resolve, reject) => {
   if(ata.length>0){
    ata.forEach((ele)=>{
      const awb=ele.shipping.awb_number
      const url= `https://shipment.xpressbees.com/api/shipments2/track/${awb}`
      var options = {
       url: url,
       method: 'GET',

       headers: {
         'User-Agent': 'my request',
         'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2ODY4ODM3NjUsImp0aSI6InJiZDFrRGU0SXFjOGJNOFBsWTVzekljOHd4ZmFpM3VXeUpidnhJbjZPTU09IiwibmJmIjoxNjg2ODgzNzY1LCJleHAiOjE2ODY4OTQ1NjUsImRhdGEiOnsidXNlcl9pZCI6IjY0OTMxIiwicGFyZW50X2lkIjoiMCJ9fQ.dVozjKYTRTUlVPF8YySwlg6Hwkn6UnpNj6a4xjtymXyb0oxlDNMpoHtQug7DsLT32gbQDVZQRAOe6y7SaYyRkQ',
         'Content-Type': 'application/json',
         'Accept': 'application/json'
       }
     };
   
   
     
     var callback = (error, response, body) => {
  
       
       const sys=JSON.parse(`${body}`)

       sys?.data?.status=="RTO"?dis.push(ele):""
    
       // console.log("ele1",bis);
       //   if(sys.data.status=="pending pickup"){
          
       //      bis.push(ele)
       //      console.log("ele",bis);
       //   }
       //  
       resolve()
     }
     const result =  request(options, callback);
    }) 
   }else{
       resolve(dis)
   }


   })
      const ataz=await shopifyOrderModel.find({processing:stat})

      const  bis=[]
  
console.log("ataz",ataz);
var bar= new Promise((resolve, reject) => {

if(ataz.length>0){
  ataz.forEach((ele,index,ataz)=>{

    const awb=ele.shipping.awb_number

   
    const url= `https://shipment.xpressbees.com/api/shipments2/track/${awb}`
    var options = {
     url: url,
     method: 'GET',

     headers: {
       'User-Agent': 'my request',
       'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2ODY4ODM3NjUsImp0aSI6InJiZDFrRGU0SXFjOGJNOFBsWTVzekljOHd4ZmFpM3VXeUpidnhJbjZPTU09IiwibmJmIjoxNjg2ODgzNzY1LCJleHAiOjE2ODY4OTQ1NjUsImRhdGEiOnsidXNlcl9pZCI6IjY0OTMxIiwicGFyZW50X2lkIjoiMCJ9fQ.dVozjKYTRTUlVPF8YySwlg6Hwkn6UnpNj6a4xjtymXyb0oxlDNMpoHtQug7DsLT32gbQDVZQRAOe6y7SaYyRkQ',
       'Content-Type': 'application/json',
       'Accept': 'application/json'
     }
   };
 
 
   
   var callback =(error, response, body) => {

    const sys=JSON.parse(`${body}`)
    sys?.data?.status=="RTO"?bis.push(ele):""
    if (index === ataz.length -1) resolve();

}

  request(options, callback);

  
  })
}else{
  resolve(bis)
}

})


       
  //  zor.then(()=>{
      
  //       })
     

  bar.then(()=>{
    console.log("ele2",bis);
    
     const data=[...bis,...dis]
     res.status(200).json(data)
  })
    
  } catch (error) {
    res.status(500).json(error)
  }
}



export const allRtoprocessing=async(req,res)=>{
  try {

    const {status,rto}=req.body
    const stat=rto?!status:status

    const ata=await OrderModel.find({processing:stat})

    const dis=[];
 
   var zor=new Promise((resolve, reject) => {
   if(ata.length>0){
    ata.forEach((ele)=>{
      const awb=ele.shipping.awb_number
      const url= `https://shipment.xpressbees.com/api/shipments2/track/${awb}`
      var options = {
       url: url,
       method: 'GET',

       headers: {
         'User-Agent': 'my request',
         'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2ODY4ODM3NjUsImp0aSI6InJiZDFrRGU0SXFjOGJNOFBsWTVzekljOHd4ZmFpM3VXeUpidnhJbjZPTU09IiwibmJmIjoxNjg2ODgzNzY1LCJleHAiOjE2ODY4OTQ1NjUsImRhdGEiOnsidXNlcl9pZCI6IjY0OTMxIiwicGFyZW50X2lkIjoiMCJ9fQ.dVozjKYTRTUlVPF8YySwlg6Hwkn6UnpNj6a4xjtymXyb0oxlDNMpoHtQug7DsLT32gbQDVZQRAOe6y7SaYyRkQ',
         'Content-Type': 'application/json',
         'Accept': 'application/json'
       }
     };
   
   
     
     var callback = (error, response, body) => {
  
       
       const sys=JSON.parse(`${body}`)

       sys?.data?.status=="RTO In Transit"?dis.push(ele):""
    
       // console.log("ele1",bis);
       //   if(sys.data.status=="pending pickup"){
          
       //      bis.push(ele)
       //      console.log("ele",bis);
       //   }
       //  
       resolve()
     }
     const result =  request(options, callback);
    }) 
   }else{
       resolve(dis)
   }


   })
      const ataz=await shopifyOrderModel.find({processing:stat})

      const  bis=[]
  
console.log("ataz",ataz);
var bar= new Promise((resolve, reject) => {

if(ataz.length>0){
  ataz.forEach((ele,index,ataz)=>{

    const awb=ele.shipping.awb_number

   
    const url= `https://shipment.xpressbees.com/api/shipments2/track/${awb}`
    var options = {
     url: url,
     method: 'GET',

     headers: {
       'User-Agent': 'my request',
       'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2ODY4ODM3NjUsImp0aSI6InJiZDFrRGU0SXFjOGJNOFBsWTVzekljOHd4ZmFpM3VXeUpidnhJbjZPTU09IiwibmJmIjoxNjg2ODgzNzY1LCJleHAiOjE2ODY4OTQ1NjUsImRhdGEiOnsidXNlcl9pZCI6IjY0OTMxIiwicGFyZW50X2lkIjoiMCJ9fQ.dVozjKYTRTUlVPF8YySwlg6Hwkn6UnpNj6a4xjtymXyb0oxlDNMpoHtQug7DsLT32gbQDVZQRAOe6y7SaYyRkQ',
       'Content-Type': 'application/json',
       'Accept': 'application/json'
     }
   };
 
 
   
   var callback =(error, response, body) => {

    const sys=JSON.parse(`${body}`)
    sys?.data?.status=="RTO In Transit"?bis.push(ele):""
    if (index === ataz.length -1) resolve();

}

  request(options, callback);

  
  })
}else{
  resolve(bis)
}

})


       
  //  zor.then(()=>{
      
  //       })
     

  bar.then(()=>{
    console.log("ele2",bis);
    
     const data=[...bis,...dis]
     res.status(200).json(data)
  })
    
  } catch (error) {
    res.status(500).json(error)
  }
}


export const allRtoCompleete=async(req,res)=>{
  try {

    const {status,rto}=req.body
    const stat=rto?!status:status

    const ata=await OrderModel.find({processing:stat})

    const dis=[];
 
   var zor=new Promise((resolve, reject) => {
   if(ata.length>0){
    ata.forEach((ele)=>{
      const awb=ele.shipping.awb_number
      const url= `https://shipment.xpressbees.com/api/shipments2/track/${awb}`
      var options = {
       url: url,
       method: 'GET',

       headers: {
         'User-Agent': 'my request',
         'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2ODY4ODM3NjUsImp0aSI6InJiZDFrRGU0SXFjOGJNOFBsWTVzekljOHd4ZmFpM3VXeUpidnhJbjZPTU09IiwibmJmIjoxNjg2ODgzNzY1LCJleHAiOjE2ODY4OTQ1NjUsImRhdGEiOnsidXNlcl9pZCI6IjY0OTMxIiwicGFyZW50X2lkIjoiMCJ9fQ.dVozjKYTRTUlVPF8YySwlg6Hwkn6UnpNj6a4xjtymXyb0oxlDNMpoHtQug7DsLT32gbQDVZQRAOe6y7SaYyRkQ',
         'Content-Type': 'application/json',
         'Accept': 'application/json'
       }
     };
   
   
     
     var callback = (error, response, body) => {
  
       
       const sys=JSON.parse(`${body}`)

       sys?.data?.status=="RTO Delivered"?dis.push(ele):""
    
       // console.log("ele1",bis);
       //   if(sys.data.status=="pending pickup"){
          
       //      bis.push(ele)
       //      console.log("ele",bis);
       //   }
       //  
       resolve()
     }
     const result =  request(options, callback);
    }) 
   }else{
       resolve(dis)
   }


   })
      const ataz=await shopifyOrderModel.find({processing:stat})

      const  bis=[]
  
console.log("ataz",ataz);
var bar= new Promise((resolve, reject) => {

if(ataz.length>0){
  ataz.forEach((ele,index,ataz)=>{

    const awb=ele.shipping.awb_number

   
    const url= `https://shipment.xpressbees.com/api/shipments2/track/${awb}`
    var options = {
     url: url,
     method: 'GET',

     headers: {
       'User-Agent': 'my request',
       'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2ODY4ODM3NjUsImp0aSI6InJiZDFrRGU0SXFjOGJNOFBsWTVzekljOHd4ZmFpM3VXeUpidnhJbjZPTU09IiwibmJmIjoxNjg2ODgzNzY1LCJleHAiOjE2ODY4OTQ1NjUsImRhdGEiOnsidXNlcl9pZCI6IjY0OTMxIiwicGFyZW50X2lkIjoiMCJ9fQ.dVozjKYTRTUlVPF8YySwlg6Hwkn6UnpNj6a4xjtymXyb0oxlDNMpoHtQug7DsLT32gbQDVZQRAOe6y7SaYyRkQ',
       'Content-Type': 'application/json',
       'Accept': 'application/json'
     }
   };
 
 
   
   var callback =(error, response, body) => {

    const sys=JSON.parse(`${body}`)
    sys?.data?.status=="RTO Delivered"?bis.push(ele):""
    if (index === ataz.length -1) resolve();

}

  request(options, callback);

  
  })
}else{
  resolve(bis)
}

})


       
  //  zor.then(()=>{
      
  //       })
     

  bar.then(()=>{
    console.log("ele2",bis);
    
     const data=[...bis,...dis]
     res.status(200).json(data)
  })
    
  } catch (error) {
    res.status(500).json(error)
  }
}