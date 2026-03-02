
import { Router } from "express";
import {
  register,
  verifyOTP,
  login,
  forgotPassword,
  verifyResetOTP,
  resetPassword,
  me,
  changePassword,
  updateProfile,
} from "../controller/auth.controller";
import { authMiddleWare } from "../middlewares/auth.middlewares";

const router = Router();
router.post("/register", register);
router.post("/verify-otp", verifyOTP);
router.post("/login", login);
router.get("/me",authMiddleWare, me);
router.post("/changepassword", authMiddleWare,changePassword);
router.put("/update-profile",authMiddleWare,updateProfile)
router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-otp", verifyResetOTP);
router.post("/reset-password", resetPassword);

  
export default router;

  