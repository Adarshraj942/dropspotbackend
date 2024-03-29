import  express  from "express";
import authMiddleWare from "../Middleware/authMiddleware.js";
import { blockUser, deleteUser, getAllUser, getconnectedshops, getUser, UnblockUser, updateUser } from "../Controllers/UserController.js";
const router=express.Router();
router.get("/",getAllUser) 
router.get("/:id",getUser)
router.put("/:id",authMiddleWare, updateUser)
router.delete("/:id",authMiddleWare,deleteUser)
router.post("/getconnectedshops",getconnectedshops)
router.put("/:id/block" ,blockUser)
router.put("/:id/unblock" ,UnblockUser)
export default router;