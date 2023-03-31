import UserModel from "../Models/userModel.js";
import request from "request";
let apikey ="8ac6a323483d75738f2cbce0a01ab269"
let pass="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"

let endpoint="products"
let options={
    "method":"GET",
    "url":`https://${apikey}:${pass}@dropspotapi.myshopify.com/admin/api/2022-10/${endpoint}.json`,
    "headers":{
        "Content-type":"application/json"
    }
}
export const getShopifyProducts=async(req,res)=>{
    try {
        request(options,(error,response)=>{
            if(error)throw new Error(error)
            const data=response.body
            
            console.log(data);
           res.status(200).json(data)
        
        })
    } catch (error) {
        res.status(500).json(error)
    }
}


export const create=async(req,res)=>{
    try {
       console.log("Haiii")
       
       let crproduct={
        "method":"POST",
        "url":`https://${apikey}:${pass}@dropspotapi.myshopify.com/admin/api/2022-10/${endpoint}.json`,
        "headers":{
            "Content-type":"application/json"
        },
        body:JSON.stringify(req.body)
     
    }

    console.log(req.body);
    request(crproduct,(error,response)=>{
        if(error)throw new Error(error)
        const data=response.body
        res.status(200).json({data})
        console.log(response.body);
        console.log("product added");
    })



    } catch (error) {
        res.status(500).json(error)
    }
}


export const update=async(req,res)=>{
    try {
        console.log("heiii");

        let {productId,...other}=req.body
let upproduct={
    "method":"PUT",
    "url":`https://${apikey}:${pass}@dropspotapi.myshopify.com/admin/api/2022-10/${endpoint}/${productId}.json`,
    "headers":{
        "Content-type":"application/json"
    },
    body:JSON.stringify(other)
}

request(upproduct,(error,response)=>{
    if(error)throw new Error(error)
    const data=response.body
    res.status(200).json({data})
    console.log(response.body);
})
    } catch (error) {
      res.status(500).json(error)  
    }
}

export const deleteproduct =async(req,res)=>{
    try {
      
        const productId=req.params.id
        
        console.log(req.params.id);

let dlproduct={
    "method":"DELETE",
    "url":`https://${apikey}:${pass}@dropspotapi.myshopify.com/admin/api/2022-10/${endpoint}/${productId}.json`,
    "headers":{
        "Content-type":"application/json"
    }
}

request(dlproduct,(error,response)=>{
    if(error)throw new Error(error)
  const data=response.body
  res.status(200).json({data})
    console.log(response.body);
})
        console.log("hellooo");
    } catch (error) {
       res.status(500).json(error) 
    }
}



export const getorders=async(req,res)=>{
    try {
        let endpoint="orders"
       let options={
        "method":"GET",
    "url":`https://${apikey}:${pass}@dropspotapi.myshopify.com/admin/api/2022-10/${endpoint}.json`,
    "headers":{
        "Content-type":"application/json"
    }
       }

       request(options,(error,response)=>{
        if(error)throw new Error(error)
        res.status(200).json(response.body)
        console.log(response.body);
    })
    } catch (error) {
        res.status(500).json(error)
    }
}