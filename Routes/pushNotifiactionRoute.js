import express from  "express"
import { createNotification, getNotification } from "../Controllers/PushNotifiactionController.js";


const router =express.Router();

router.post("/pushNotifiactions",createNotification)

router.get("/mynotifiactions/:id",getNotification)


export default router