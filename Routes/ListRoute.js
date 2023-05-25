import express from  "express"
import { addtoListingArray, afterListingArray, checkOrder, checksku } from "../Controllers/ListController.js";
import { addDropshipperUrl, removeDropshipperUrl } from "../Controllers/UserController.js";

const router =express.Router();

router.post("/checksku",checksku)
router.post("/checkorder",checkOrder)
router.post("/addtoListingArray",addtoListingArray)
router.post("/addafterListingArray",afterListingArray)
router.post("/storeurl",addDropshipperUrl)
router.post("/removestoreurl",removeDropshipperUrl)



export default router