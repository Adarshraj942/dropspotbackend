import express from "express";
import { create, deleteproduct, getorders, getShopifyProducts, update } from "../Controllers/Shopify_controller.js";

const router=express.Router()

router.post("/create",create)
//router.post("/add")
router.put("/update",update)
router.delete("/delete/:id",deleteproduct)
router.get("/allproducts", getShopifyProducts)

router.get("/getorders",getorders)

export default router