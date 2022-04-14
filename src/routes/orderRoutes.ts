import express from "express";
import {
  register,
  authenticate,
  confirm,
  forgotPassword,
  verifyToken,
  newPassword,
  profile,
} from "../controllers/userController";
import checkAuth from "../middlewares/checkAuth";

const router = express.Router();

export default router;
