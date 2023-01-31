import mongoose from "mongoose";

const ProductSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        price:{
            type:Number,
            required:true,
        },
        desc:{
            type:String,
           
        },
        
        quantity:{
            type:Number,
           

        },
        rating:{
            type:Number,
            default:0
        },
        color:{
            type:String
        },
        EstimatedProcessingTime:{
            type:String
        },
        SPU:{
            type:String
        },
        ProductAttributes:{
            type:Array
        },
        Material:{
            type:String
        },
        Lists:{
            type:Number
        },
        image0:String,
        image1:String,
        image2:String,
        image3:String,
        image4:String,

  
        
      

    },
    {timestamps:true}
)

const productModel=mongoose.model("Products",ProductSchema);

export default productModel;