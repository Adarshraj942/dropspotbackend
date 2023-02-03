import WishlistModel from "../Models/wishlistModel";

export const getCart=async(req,res)=>{
  try {
    const {userId}=req.body
  const cart =WishlistModel.findOne({ownerId:userId})
  res.status(200).json({cart})
  } catch (error) {
    res.status(500).json(error)
  }
}

export const addToWishlist=async(req,res)=>{
    console.log("haiii");
    try {
      const {userId}=req.body
    
    
      let pro={
        product:req.body.productId,
        quantity:req.body.quantity
      }
    const cart =await WishlistModel.findOneAndUpdate({ownerId:userId},{ $push:{products:pro}},{new:true})
          
          res.status(200).json({cart}) 
    } catch (error) {
      res.status(500).json(error)
    }
}


export const removeFromWishlist=async(req,res)=>{
    try {
       const {userId,productId}=req.body 

      const cart=await WishlistModel.findOneAndUpdate({ownerId:userId}, { $pull: { products: { productId: productId } } },{new:true})
     res.status(200).json({cart})
    } catch (error) {
        res.status(500).json(error) 
    }
}