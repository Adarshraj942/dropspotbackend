import CartModel from "../Models/wishListModel.js";



export const addToWishlist=async(req,res)=>{
    console.log("haiii");
    try {
      const {userId}=req.body
    
      let newCart=CartModel({OwnerId:userId})
      let pro={
        product:req.body.productId,
        quantity:req.body.quantity
      }

      newCart.products.push(pro)
            
      // const user= await PractiseModel.find({createrId:createrId})
        console.log("koiiii",newCart);  
  
          const cart=await newCart.save()
          
          res.status(200).json({cart}) 
    } catch (error) {
      res.status(500).json(error)
    }
}


export const removeFromWishlist=async(req,res)=>{
    try {
       const {userId,productId}=req.body 

       const cart=await CartModel.findByIdAndUpdate(userId)
    } catch (error) {
        res.status(500).json(error) 
    }
}