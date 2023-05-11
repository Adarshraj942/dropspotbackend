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
          type:String,
          default:false
        },
        preOrder:{
           type:Boolean,
           default:false
        },
        preOrderFullfill:{
          type:String,
          default:"PreOrderd"
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
        quantity:{
            type:Number
        },
        sellerName:{
            type:String 
        },
        image:{
            type:String 
        },
        sellerId:{
            type:String
        }

    },

    {timestamps:true}
)

const OrderModel=mongoose.model("Orders",OrderSchema);

export default OrderModel;