import mongoose from "mongoose";

const ProductSchema=mongoose.Schema(
    {
        name:{
            type:String,
           
        },
        category:{
            type:String
        },
        subCategory:{
           type:String  
        },
        price:{
            type:Number,
       
        },
        maxPrice:{
            type:Number
        },
        wholesalePrice:{
            type:Number
        },
        desc:{
            type:String,
           
        },
        targetedCountry:{
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
        sku:{
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

        sizeVariation:{
          type:Array
        },

        colorVariation:{
           type:Array
        },
        sellerId:{
            type:String
        },sellerName:{
            type:String
        },

        
        image0:String,
        image1:String,
        image2:String,
        image3:String,
        image4:String,
        title:String,
        height:String,
        weight:String,
        deapth:String,
        width:String,


  
        
      

    },
    {timestamps:true}
)

const productModel=mongoose.model("Products",ProductSchema);

export default productModel;