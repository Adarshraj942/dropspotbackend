import mongoose from "mongoose";

const DisputeSchema=mongoose.Schema(
    {
        party1:{
            type:String,
            required:true,
        },
        attributes:{
            type:Array,
            
        },
        awaitingResponse:{
            type:Boolean,
            default:true
        },
        completed:{
            type:Boolean,
            default:false
        },
        closed:{
            type:Boolean,
            default:false
        },
        data:{
            type:Array
        },
        title:{
            type:String
        },
        subject:{
            type:String
        },party2:{
            type:String
        },
        disputeType:{
            type:String
        },
        response:{
            type:String
        }


    },
    {timestamps:true}
)

const DisputeModel=mongoose.model("Dispute",DisputeSchema);

export default DisputeModel;