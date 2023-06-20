import express from  "express"
import { cashIn, cashOut } from "../Controllers/PaymentController.js";


const router =express.Router();

router.post("/payment",cashIn)
router.post("/payout",cashOut)



export default router