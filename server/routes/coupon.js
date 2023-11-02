import express from "express";

const router = express.Router();

// middlewares
import { requireSignin, isAdmin } from "../middlewares/auth.js";

import { 
                    create
 } from "../controllers/coupon.js";

router.post("/createCoupon", requireSignin, isAdmin, create);


export default router;



