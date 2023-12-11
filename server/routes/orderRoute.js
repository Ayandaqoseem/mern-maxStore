import express from "express";
import { isAdmin, requireSignin } from "../middlewares/auth.js";

const router = express.Router();

import {
  UpdateOrderStatus,
  createOrder,
  getOrder,
  getOrders,
  payWithStripe,
} from "../controllers/order.js";

router.post("/orders", requireSignin, createOrder);
router.get("/orders", requireSignin, getOrders);
router.get("/order/:id", requireSignin, getOrder);
router.patch("/order/:id", requireSignin, isAdmin, UpdateOrderStatus);


router.post("/create-payment-intent", payWithStripe)

export default router;
