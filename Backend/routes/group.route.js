import { Router } from "express";
const router = Router();

// Controllers
import {
  index,
  GetGroupById,
  CreateGroup,
  UpdateGroup,
  DeleteGroup,
} from "../controllers/group.controller.js";

// CRUD
router.get("/", index);
router.get("/:id", GetGroupById);
router.post("/", CreateGroup);
router.put("/:id", UpdateGroup);
router.delete("/:id", DeleteGroup);

export default router;
