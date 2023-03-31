import mongoose from "mongoose";

const QueeSchema=mongoose.Schema(
    {
        ownerId:{
            type:String,
            required:true,
        },
        products:{
            type:Array,
            
        },

    },
    {timestamps:true}
)

const QueeModel=mongoose.model("Quee",QueeSchema);

export default QueeModel;