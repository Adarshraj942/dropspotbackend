import express from  "express"
import { addToWishlist, getWishlist, removeFromWishlist } from "../Controllers/WishListController.js";

const router =express.Router();

router.post("/add",addToWishlist)
router.post("/remove",removeFromWishlist)
router.post("/get",getWishlist)




export default router