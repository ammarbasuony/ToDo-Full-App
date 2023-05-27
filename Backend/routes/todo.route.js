import { Router } from "express";
const router = Router();

// Controllers
import {
  index,
  GetToDoById,
  CreateToDo,
  UpdateToDo,
  DeleteToDo,
  DeleteToDoPermanently,
  RestoreToDo,
} from "../controllers/todo.controller.js";

// CRUD
router.get("/", index);
router.get("/:id", GetToDoById);
router.post("/", CreateToDo);
router.put("/:id", UpdateToDo);
router.delete("/:id", DeleteToDo);
router.delete("/delete/:id", DeleteToDoPermanently);
router.patch("/restore/:id", RestoreToDo);

export default router;
