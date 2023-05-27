import { Router } from "express";
const router = Router();

// Routes
import authRoutes from "./auth.route.js";
import userRoutes from "./user.route.js";
import todoRoutes from "./todo.route.js";
import groupRoutes from "./group.route.js";

// Middlewares
import auth from "../middleware/auth.middleware.js";
import verifyType from "../middleware/verify-type.middleware.js";

// Helpers
import { UserType } from "../helpers/constants.helper.js";

router.use("/auth", authRoutes);
router.use("/users", auth, verifyType([UserType.ADMIN]), userRoutes);
router.use("/todos", auth, todoRoutes);
router.use("/groups", auth, verifyType([UserType.ADMIN]), groupRoutes);

export default router;
