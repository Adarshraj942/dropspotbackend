import express from  "express"
import { addBulkProduct, addProduct, addVarient, allProducts, deleteProduct, editProduct, getProduct } from "../Controllers/ProductController.js";


const router =express.Router();


router.post("/add",addProduct)
router.put("/:id/edit",editProduct)
router.get("/getproducts",allProducts)
router.post("/addbulk",addBulkProduct)


router.get("/:id",getProduct)
router.post("/addvarient",addVarient)
router.delete("/:id",deleteProduct)




export default router