import express from  "express"
import { checkOrder, checksku } from "../Controllers/ListController.js";

const router =express.Router();

router.post("/checksku",checksku)
router.post("/checkorder",checkOrder)




export default router