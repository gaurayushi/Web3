import express from 'express';
import { createProject, getProjects ,deleteProject} from '../controllers/project.controller.js';
import { protect } from '../middleware/auth.js'; // ✅ named import

const router = express.Router();

router.post('/', protect, createProject);
router.get('/', protect, getProjects);
router.delete('/:id', protect, deleteProject);

export default router;
