import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv"
import cors from "cors"
import UserRoute from "./Routes/UserRoute.js"
import ShopifyRoute from "./Routes/ShopifyRoute.js"
import AuthRoute from "./Routes/AuthRoute.js"
import ProductRoute from "./Routes/ProductRoute.js"
import WishlistRoute from "./Routes/WishListRoute.js"
import ConnectRoute from "./Routes/ConnectRoute.js"
import QueeRoute from "./Routes/QueeRoute.js"
import ListRoute from "./Routes/ListRoute.js"
import UploadRoute from "./Routes/UploadRoute.js"
import orderRoute from "./Routes/OrderRoute.js"
import authMiddleWare from "./Middleware/authMiddleware.js";
const app=express();

app.use(express.static("public"))
app.use("images",express.static("images"))
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
 
app.use(cors())
dotenv.config() 


mongoose.connect(process.env.MONGO_DB,
    {useNewUrlParser:true,useUnifiedTopology:true}
    ).then(()=>{
        app.listen(process.env.PORT,()=>console.log("Listening @",process.env.PORT))
    }).catch((err)=>{
       console.log(err);
    })

app.get("/test",(req,res)=>{
    res.send("hello ")
})
    app.use("/auth",authMiddleWare,AuthRoute)  
    app.use("/product",authMiddleWare,ProductRoute) 
    app.use("/wishlist",authMiddleWare,WishlistRoute) 
      app.use("/order",authMiddleWare,orderRoute) 
     app.use("/payment",authMiddleWare,AuthRoute) 
     app.use("/user",authMiddleWare,UserRoute) 
    app.use("/connect",authMiddleWare,ConnectRoute)
    app.use("/list",authMiddleWare,ListRoute)
    app.use("/quee",authMiddleWare,QueeRoute)
    app.use('/upload',authMiddleWare,UploadRoute)
    app.use("/shoipifyconnection",authMiddleWare, ShopifyRoute)

    app.use("/superAdmin/auth",AuthRoute)  
    app.use("/superAdmin/product",ProductRoute) 
    app.use("/superAdmin/wishlist",WishlistRoute) 
      app.use("/superAdmin/order",orderRoute) 
     app.use("/superAdmin/payment",AuthRoute) 
     app.use("/superAdmin/user",UserRoute) 
    app.use("/superAdmin/connect",ConnectRoute)
    app.use("/superAdmin/list",ListRoute)
    app.use("/superAdmin/quee",QueeRoute)
    app.use('/superAdmin/upload',UploadRoute)
    app.use("/superAdmin/shoipifyconnection", ShopifyRoute)



    