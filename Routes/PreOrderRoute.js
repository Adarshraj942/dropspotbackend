import express from  "express"
import {preOrderFullfill, PreOrdercheck, create, myOrders, sellerOrders } from "../Controllers/PreOrderController.js";


const router =express.Router();


router.post("/create",create)
router.post("/edit")
router.post("/cancel")
router.post("/preorderlist",myOrders)
router.post("/sellerpreOrder",sellerOrders)
router.post("/preOrdercheck",PreOrdercheck)
router.post("/requestpreorderfullfill",preOrderFullfill)






export default router