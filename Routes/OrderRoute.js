import express from  "express"
import { create , myOrders, preOrderFullfill, sellerOrders} from "../Controllers/OrderController.js";

const router =express.Router();


router.post("/create",create)
router.post("/edit")
router.post("/cancel")
router.post("/myOrder",myOrders)
router.post("/sellerOrder",sellerOrders)
router.post("/FullFillPreOrder", preOrderFullfill)





export default router