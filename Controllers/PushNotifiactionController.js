import PushNotifiactionModel from "../Models/pushNotifiactionModel.js";



export const createNotification=async(req,res)=>{
    try {
        const {userId}=req.body
        const noti =await PushNotifiactionModel.findOne({ownerId:userId})
        if(noti){
         let pro={
           notification:req.body.notification,
           type:req.body.type,
          
         }
       const notif =await PushNotifiactionModel.findOneAndUpdate({ownerId:userId},{ $push:{Notifications:pro}},{new:true})
             
             res.status(200).json({noti}) 
        }else{
         const newNoti =PushNotifiactionModel({ownerId:userId})
         console.log(req.body);
         let pro={
            notification:req.body.notification,
           type:req.body.type,
         }
         newNoti.Notifications.push(pro)
   
       const notif=  await newNoti.save()
   
         res.status(200).json({notif})
        }  
    } catch (error) {
        res.status(500).json(error)
    }
}



export const getNotification=async(req,res)=>{
    try {
        const userId=req.params.userId
        const data=await PushNotifiactionModel.findOne({ownerId:userId})
        const noti=data.Notifications.reverse()
        res.status(200).json(noti)
    
    } catch (error) {
        res.status(500).json(error)
    }
}