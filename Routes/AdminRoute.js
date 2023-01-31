import express from "express"
import { adminLogin } from "../Controllers/AdminController.js";

const router=express.Router()

router.post("/" ,adminLogin)

export default router;