import mongoose from "mongoose"

const userWalletSchema = mongoose.Schema(
    {
      
      ownerId:{
        type:String,  
      },
      defaultAmount:{
        type:Number,
        default:100
      },
      userAddedAmount:{
        type:Number,
        default:0
      },
     creditedAmount:{
      type:Number,
      default:0
     },
     transactions:{
      type:Array
     },
      totalUsableAmount:{
        type:Number,
        default:0
      },

      walletPassword:{
        type:String,
      }
    },
    
    { timestamps: true }
  );
  
  
  const userWalletModel = mongoose.model("userWallet", userWalletSchema);
  
  export default userWalletModel ;