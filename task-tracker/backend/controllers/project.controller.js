import Project from '../models/Project.js';


export const createProject = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Project name is required" });

    const existingProjects = await Project.find({ user: req.user.id });
    if (existingProjects.length >= 4) {
      return res.status(403).json({ message: "You can only create up to 4 projects." });
    }

    const project = await Project.create({ name, user: req.user.id });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};



export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found or unauthorized" });
    }

    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
