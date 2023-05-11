import CartModel from "../Models/cartModel.js"

export const getCart=async(req,res)=>{
  try {
    const {userId}=req.body
  const Cart =await CartModel.findOne({ownerId:userId})
  res.status(200).json({Cart})
  } catch (error) {
    res.status(500).json(error)
  }
}







export const addToWishlist=async(req,res)=>{
    console.log("haiii");
    try {
     const {userId}=req.body
     const Cart =await CartModel.findOne({ownerId:userId})
     if(Cart){
      let pro={
        product:req.body.productId,
        quantity:req.body.quantity
      }
    const cart =await CartModel.findOneAndUpdate({ownerId:userId},{ $push:{products:pro}},{new:true})
          
          res.status(200).json({cart}) 
     }else{
      const newCart =CartModel({ownerId:userId})
      let pro={
        product:req.body.productId,
        quantity:req.body.quantity
      }
      newCart.products.push(pro)

    const Cart=  await newCart.save()

      res.status(200).json({Cart})
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