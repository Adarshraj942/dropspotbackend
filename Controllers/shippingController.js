import axios from "axios";
import ShippingModel from "../Models/shippingModel.js";
import request from "request";
export const createToken=async (req,res)=>{
    try {

        const ata={
            "email": "huzaif36@gmail.com",
            "password": "Josephite12!"
        }

        const {data}=await axios.post("https://shipment.xpressbees.com/api/users/login",ata)
        const dta= await ShippingModel.find()
        console.log(dta);
        if(dta.length>0){
            console.log("haiiii");
        const id=dta[0]._id
        console.log("haiiii",dta[0]._id);
       const tokn=data.data
      const datazz=await ShippingModel.findByIdAndUpdate({_id:id},{token:tokn},{new:true})
     
        res.status(200).json(datazz.token)

      }else{
     

    
        const newshipping=ShippingModel({token:data.data})
        const dataz =await newshipping.save()
        console.log(data);
        console.log(dataz);
        res.status(200).json(dataz.token) 
      }
       
   
    } catch (error) {
        res.status(500).json(error)
    }
}




export const getToken=async(req,res)=>{
    try {
       const data=await ShippingModel.find() 
       const token=data[0].token
       res.status(200).json(token)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const shippingcalculator= async(req,res)=>{
    try {
      //  const {sellerPost,clientPost,weight,width,height,deapth}=req.body
      const opt =
      { 
          "origin" : req.body.origin, 
          "destination" : req.body.destination, 
          "payment_type" : req.body.payment_type, 
          "order_amount" : req.body.order_amount, 
          "weight" :req.body.weight, 
          "length" : req.body.length, 
          "breadth" : req.body.breadth, 
          "height" : req.body.height 
      } 
    const dat=await ShippingModel.find()
    const token=dat[0].token
    console.log("token",token);
      var options = {
        url: 'https://shipment.xpressbees.com/api/courier/serviceability',
        method: 'POST',
        json: opt,
        headers: {
          'User-Agent': 'my request',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };

      var callback = (error, response, body) => {
        console.log(body);
        console.log(response.statusCode);
        res.status(response.statusCode).json(body.data)
      }


          const result = await request(options, callback);
        
    } catch (error) {
        res.status(500).json(error)
    }
}


export const trackshipment=async(req,res)=>{
  try {
    const {awb}=req.body
   const url= `https://shipment.xpressbees.com/api/shipments2/track/${awb}`
   var options = {
    url: url,
    method: 'GET',
    json: opt,
    headers: {
      'User-Agent': 'my request',
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2ODY4NzA5MTAsImp0aSI6Ink0cTFEY0lmc2RBS2RWTE1ub0pSK2o0TlZ6eG5tczhGaHV5c3czT3FSemM9IiwibmJmIjoxNjg2ODcwOTEwLCJleHAiOjE2ODY4ODE3MTAsImRhdGEiOnsidXNlcl9pZCI6IjY0OTMxIiwicGFyZW50X2lkIjoiMCJ9fQ.tHdW1lJo_GvHTTpiVH91hIEPSmWwNDVtmBeHS6xKVBttPp9x6pcwXVza0SY2Al3lHn9cY9K4x59cvOg-y38kng',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };


  
  var callback = (error, response, body) => {
    console.log(body);
    console.log(response.statusCode);
    res.status(response.statusCode).json(body.data)
  }


      const result = await request(options, callback);
  } catch (error) {
    res.status(500).json(error)
  }
}



export const cancelShipment=async(req,res)=>{
  try {
    const {awb}=req.body
    const opt={
      "awb" : awb

    }
    const url= `https://shipment.xpressbees.com/api/shipments2/cancel`
    var options = {
     url: url,
     method: 'POST',
     json: opt,
     headers: {
       'User-Agent': 'my request',
       'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2ODYxOTkxNDYsImp0aSI6IjlRUFNCSWVDXC9lWW5pR01mdDU3am5XUVZic3MzUlA5bWw0a2oxOEFacUMwPSIsIm5iZiI6MTY4NjE5OTE0NiwiZXhwIjoxNjg2MjA5OTQ2LCJkYXRhIjp7InVzZXJfaWQiOiI2NDkzMSIsInBhcmVudF9pZCI6IjAifX0.KNtbMFhMB3IHjL1MytZf4ARcaX5ooTQwSBUy0dcEryW9ccCL3V3ZIGXRgTxejKks9yKaredccBlj4VpWeD-VHA',
       'Content-Type': 'application/json',
       'Accept': 'application/json'
     }
   };
 
   var callback = (error, response, body) => {
     console.log(body);
     console.log(response.statusCode);
     res.status(response.statusCode).json(body.data)
   }
 
 
       const result = await request(options, callback);
  } catch (error) {
    res.status(500).json(error)
  }
}