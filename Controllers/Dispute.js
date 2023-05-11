import DisputeModel from "../Models/DisputeModel.js";



export const create=async(req,res)=>{
    try {
        console.log("haiii");  
       let newOrder=DisputeModel(req.body)
       const dispute=await newOrder.save()
        
       res.status(200).json({dispute}) 
    } catch (error) {
        
    }
}


export const edit=async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}



export const cancel=async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}