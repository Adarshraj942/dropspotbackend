import mongoose from "mongoose";

const PushNotifiactionSchema=mongoose.Schema(
    {
       
        ownerId:{
            type:String
            
        },
        Notifications:{
            type:Array
        }


    },
    {timestamps:true}
)

const PushNotifiactionModel=mongoose.model("PushNotifiactio",PushNotifiactionSchema);

export default PushNotifiactionModel;