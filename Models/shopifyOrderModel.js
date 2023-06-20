import mongoose from "mongoose";

const shopifyOrderSchema=mongoose.Schema(
    {
        dropshipperId:{
            type:String,
            required:true,
        },
        productName:{
            type:String
        },
        productId:{
            type:String,
            
        },
        shipping:{
            type:Object
        },
        shippinCharge:{
            type:Number
        },
        sku:{
            type:String,
        },
        shopifyproductId:{
            type:String,
            
        },
        shopifyOrderId:{
            type:String,
        },
        deliveryAddress:{
            type:Object
        },
        price:{
            type:Number
        },
        type:{
            type:String
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
        pending:{
            type:Boolean,
            default:false
        },
        shopifyOrder:{
            type :Boolean,
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

const shopifyOrderModel=mongoose.model("shopifyOrders",shopifyOrderSchema);

export default shopifyOrderModel;