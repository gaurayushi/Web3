import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, createTask);               
router.get("/:projectId", protect, getTasks);       
router.put("/:taskId", protect, updateTask);       
router.delete("/:taskId", protect, deleteTask);      

export default router;
