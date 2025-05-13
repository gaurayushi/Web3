import Task from "../models/Task.js";

// Create a new task
export const createTask = async (req, res) => {
  const { title, description, status, projectId } = req.body;
  if (!title || !projectId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const task = await Task.create({
      title,
      description,
      status: status || "Todo",
      project: projectId,
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Error creating task", error: err.message });
  }
};

// Get all tasks for a project
export const getTasks = async (req, res) => {
  const { projectId } = req.params;

  try {
    const tasks = await Task.find({ project: projectId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks", error: err.message });
  }
};

// Update a task (title, description, status, completed)
export const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, description, status, completed } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description, status, completed },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: "Error updating task", error: err.message });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting task", error: err.message });
  }
};
