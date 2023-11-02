import express from "express";

const router = express.Router();

// middlewares
import { isAdmin, requireSignin} from "../middlewares/auth.js";
// controller 
import { 
    register, 
    login,
    authCheck,
    adminCheck 
} from "../controllers/auth.js"


router.post("/register", register);
router.post("/login", login);
router.get("/auth-check", requireSignin, authCheck);
router.get("/admin-check", requireSignin, isAdmin, adminCheck)

export default router;