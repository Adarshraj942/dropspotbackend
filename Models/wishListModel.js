import mongoose from "mongoose";

const WishlistSchema=mongoose.Schema(
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

const WishlistModel=mongoose.model("Wishlist",WishlistSchema);

export default WishlistModel;