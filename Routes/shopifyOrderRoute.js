import express from  "express"
import { create, myOrders } from "../Controllers/shopifyOrderController.js";


const router =express.Router();


router.post("/create",create)
router.post("/edit")
router.post("/cancel")
router.post("/shopifyOrder",myOrders)
router.post("/sellerOrder")
router.post("/FullFillPreOrder")





export default router