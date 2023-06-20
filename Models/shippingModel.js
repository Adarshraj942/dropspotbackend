import mongoose from "mongoose";

const ShippingSchema=mongoose.Schema(
    {
       
       
       token:{
            type:String
        }


    },
    {timestamps:true}
)

const ShippingModel=mongoose.model("ShippingCredentials",ShippingSchema);

export default ShippingModel;