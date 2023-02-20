import express from  "express"
import { loginUser, otpValidation, otpVerification, registerUser } from "../Controllers/AuthController.js";

const router =express.Router();


router.post("/register",registerUser )
router.post("/login",loginUser)
router.post("/mobile", otpValidation);
router.post("/otp", otpVerification);


export default router