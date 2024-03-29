// import WishlistModel from "../Models/wishlistModel.js";
import WishlistModel from "../Models/wishlist_model.js"

export const getWishlist=async(req,res)=>{
  try {
    const {userId}=req.body
  const Wishlist =await WishlistModel.findOne({ownerId:userId})
  res.status(200).json({Wishlist})
  } catch (error) {
    res.status(500).json(error)
  }
}







export const addToWishlist=async(req,res)=>{
    console.log("haiii");
    try {
     const {userId}=req.body
     const wishlist =await WishlistModel.findOne({ownerId:userId})
     if(wishlist){
      let pro={
        product:req.body.productId,
        quantity:req.body.quantity,
        price:req.body.price,
        date:req.body.date,
        image:req.body.image,
        name:req.body.name
      }
    const cart =await WishlistModel.findOneAndUpdate({ownerId:userId},{ $push:{products:pro}},{new:true})
          
          res.status(200).json({cart}) 
     }else{
      const newWishlist =WishlistModel({ownerId:userId})
      console.log(req.body);
      let pro={
        product:req.body.productId,
        quantity:req.body.quantity,
        price:req.body.price,
        date:req.body.date,
        image:req.body.image,
        name:req.body.name
      }
      newWishlist.products.push(pro)

    const wishlist=  await newWishlist.save()

      res.status(200).json({wishlist})
     }
  
    } catch (error) {
      res.status(500).json(error)
    }
}


export const removeFromWishlist=async(req,res)=>{
    try {
       const {userId,productId}=req.body 

      const cart=await WishlistModel.findOneAndUpdate({ownerId:userId}, { $pull: { products: { product: productId } } },{new:true})
     res.status(200).json({cart})
    } catch (error) {
        res.status(500).json(error) 
    }
}