import express from "express";
import {
  createOrder,
  captureOrder,
  cancelOrder,
} from "../controllers/payPalOrderController";
import checkAuth from "../middlewares/checkAuth";

const router = express.Router();

router.post("/", checkAuth, createOrder);

router.get("/capture", captureOrder);

router.get("/cancel/", cancelOrder);
export default router;
