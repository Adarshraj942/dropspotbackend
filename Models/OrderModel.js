import mongoose from "mongoose";

const OrderSchema=mongoose.Schema(
    {
        userId:{
            type:String,
            required:true,
        },
        productName:{
            type:String
        },
        productId:{
            type:String,
            
        },
        deliveryAddress:{
            type:Object
        },
        price:{
            type:Number
        },
        paymentMod:{
            type:String
        },
        awaitingPayments:{
            type:Boolean,
            default:true
        },
        orderType:{
          type:String
        },
        pending:{
            type:Boolean,
            default:true
        },
        processing:{
            type:Boolean,
            default:false
        },
        dispatched:{
            type:Boolean,
            default:false
        },
        completed:{
            type:Boolean,
            default:false
        },
        closed:{
            type:Boolean,
            default:false
        },
        return:{
            type:Boolean,
            default:false
        },

    },

    {timestamps:true}
)

const OrderModel=mongoose.model("Orders",OrderSchema);

export default OrderModel;