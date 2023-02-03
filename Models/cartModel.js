import mongoose from "mongoose";

const CartSchema=mongoose.Schema(
    {
        OwnerId:{
            type:String,
            required:true,
        },
        products:{
            type:Array,
            
        },

    },
    {timestamps:true}
)

const CartModel=mongoose.model("Cart",CartSchema);

export default CartModel;