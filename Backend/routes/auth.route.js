import { Router } from "express";
const router = Router();

// Auth Middleware
import auth from "../middleware/auth.middleware.js";

// Controllers
import {
  UserLogin,
  UserRegister,
  GetUserFromToken,
} from "../controllers/auth.controller.js";

// Auth Routes
router.post("/login", UserLogin);
router.post("/signup", UserRegister);
router.post("/get-user", auth, GetUserFromToken);

export default router;
