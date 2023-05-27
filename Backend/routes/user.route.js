import { Router } from "express";
const router = Router();

// Controllers
import {
  index,
  GetUserById,
  CreateUser,
  UpdateUser,
  DeleteUser,
} from "../controllers/user.controller.js";

// CRUD
router.get("/", index);
router.get("/:id", GetUserById);
router.post("/", CreateUser);
router.put("/:id", UpdateUser);
router.delete("/:id", DeleteUser);

export default router;
