import express from  "express"
import { create ,allOrders} from "../Controllers/OrderController.js";

const router =express.Router();


router.post("/create",create)
router.post("/edit")
router.post("/cancel")
router.get("/allOrder",allOrders)




export default router