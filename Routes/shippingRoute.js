

import express from  "express"
import { cancelShipment, createToken, getToken, shippingcalculator, trackshipment} from "../Controllers/shippingController.js";


const router =express.Router();


router.post("/createtoken",createToken)
router.get("/gettoken",getToken)
router.post("/shippingcalculator",shippingcalculator)
router.post("/track",trackshipment)
router.post("/cancel", cancelShipment)
export default router