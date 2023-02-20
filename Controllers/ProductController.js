import productModel from "../Models/productModel.js"

export const addProduct=async(req,res)=>{
  console.log("haiii");
  try {
    const {name, price,desc,quantity}=req.body
    console.log(name, price,desc,quantity);
    let newProduct=productModel(req.body)
          
    // const user= await PractiseModel.find({createrId:createrId})
      console.log("koiiii",newProduct);  

        const Product=await newProduct.save()
        
        res.status(200).json({Product}) 
  } catch (error) {
    res.status(500).json(error)
  }
}


export const addBulkProduct=async(req,res)=>{
  console.log("haiii");
  console.log("kaiii",req.body);
  // const beta =await productModel.insertMany(req.body)
        
  //       res.status(200).json({beta}) 
  try {
    console.log("maiii");
    // const {data}=req.body
   const beta =await productModel.insertMany(req.body)
        
        res.status(200).json({beta}) 
  } catch (error) {
    res.status(500).json(error)
  }
}

export const editProduct=async(req,res)=>{
    try {
        console.log("haiii");
        const id=req.params.id;
        const {data}=req.body;  
        
       
    
    
        if(id ){
            try {
    
                
               const beta =await productModel.findByIdAndUpdate(id,data,{new:true})

               res.status(200).json({beta})
    
      
            } catch (error) {
                res.status(500).json(error) 
            }
        }else{
            res.status(403).json("Product not found")
        }
    } catch (error) {
      res.status(500).json(error)
    } 
}


export const allProducts=async(req,res)=>{
    try {
       const data=await productModel.find()
       const beta= data.slice(0,15)
       console.log(beta.length);
       res.status(200).json(beta)
    } catch (error) {
      res.status(500).json(error)
    }
} 


export const getProduct=async(req,res)=>{
    try {
        const productId=req.params.id
        const data=await productModel.findById(productId)
        if(data){
            res.status(200).json(data)
        }
        else{
            res.status(400).json("Product not found")
        }
 
    } catch (error) {
      res.status(500).json(error)
    } 
}

export const deleteProduct=async(req,res)=>{
    try {
        const productId=req.params.productId
         await productModel.deleteOne({productId})
         res.status(200).json("deleted successfully")
    } catch (error) {
      res.status(500).json(error)
    }
}

export const addVarient=async(req,res)=>{
  console.log("varient");
  try {
   const {productId,type1,data}=req.body
   const bata=await productModel.findByIdAndUpdate({productId},{$push:{type1:data}},{new:True})

   if(data){
    res.status(200).json(bata)
   }else{
    res.status(400).json("not updated")
   }
  } catch (error) {
    res.status(500).json(error)
  }
}
