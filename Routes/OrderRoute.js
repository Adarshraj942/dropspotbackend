import express from  "express"
import { Acceptreturn, addShippingCharge, allRto, allRtoCompleete, allRtopickup, allRtoprocessing, allawaitingPayments, allclosed, allcomplete, alldispatched, allpending, allprocessing, allreturn, allreturnreq, changeawaitingPaymentstatus, changeclosestatus, changecompletestatus, changedispatchedstatus, changependingstatus, changeprocessingstatus, changereturnstatus, create , myOrders, preOrderFullfill, reqreturn, requestpaymentstatus, sellerOrders} from "../Controllers/OrderController.js";

const router =express.Router();


router.post("/create",create)
router.post("/edit")
router.post("/cancel")
router.post("/allRto",allRto)
router.post("/allRtopickup",allRtopickup)
router.post("/allRtoprocessing",allRtoprocessing)
router.post("/allRtoComplete",allRtoCompleete)
router.post("/myOrder",myOrders)
router.post("/sellerOrder",sellerOrders)
// router.post("/FullFillPreOrder", preOrderFullfill)
router.post("/return",allreturn)
router.post("/returnreq",allreturnreq)
router.post("/close",allclosed)
router.post("/complete",allcomplete)
router.post("/dispatched",alldispatched)
// router.post("/shopifydispatched",allshopifydispatched)
router.post("/processing",allprocessing)
router.post("/pending",allpending)
router.post("/awaitingpayments",allawaitingPayments)
router.post("/changeawaitingpaymentstatus",changeawaitingPaymentstatus)
router.put("/changereturnstatus",changereturnstatus)
router.put("/reqreturn",reqreturn)
router.put("/acceptreturn",Acceptreturn)
router.post("/addshippingcharge",addShippingCharge)
router.put("/changeclosestatus",changeclosestatus)
router.put("/changecompletestatus",changecompletestatus)
router.put("/changedispatchedstatus",changedispatchedstatus)
router.put("/changeprocessingstatus",changeprocessingstatus)
router.put("/changependingstatus",changependingstatus)
router.put("/requestpaymentstatus",requestpaymentstatus)







export default router