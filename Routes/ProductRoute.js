import express from  "express"
import { addProduct, allProducts, deleteProduct, editProduct, getProduct } from "../Controllers/ProductController.js";


const router =express.Router();


router.post("/add",addProduct)
router.put("/:id/edit",editProduct)
router.get("/getproducts",allProducts)
router.post("/addbulk",addBulkProduct)


router.get("/:id",getProduct)

router.delete("/:id",deleteProduct)




export default router