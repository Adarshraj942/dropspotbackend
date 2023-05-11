import mongoose from "mongoose";

const UserSchema=mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
        },
        accountType:{
            type:String
        },
        password:{
            type:String,
            required:true,
        },
        firstname:{
            type:String,
           
        },
        lastname:{
            type:String,
          
        },
        isAdmin:{
            type:Boolean,
            default:false

        },
        auth:{
            type:Boolean,
            default:true
        },address:{
            type:Array
          },
        
        profilePicture:String,
      
        about:String,
        livesin:String,
        worksAt:String,
        country:String,
        relationship:String,

      

    },
    {timestamps:true}
)

const UserModel=mongoose.model("Users",UserSchema);

export default UserModel;