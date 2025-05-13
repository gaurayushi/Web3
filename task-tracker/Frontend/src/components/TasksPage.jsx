import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../helpers/api";
import { toast } from "react-toastify";
import {
  FaArrowLeft,
  FaPlus,
  FaEdit,
  FaStickyNote,
  FaAlignLeft,
} from "react-icons/fa";
import TaskCard from "../components/TaskCard";

const TasksPage = () => {
  const { id: projectId } = useParams();
  const navigate = useNavigate();

  const [projectName, setProjectName] = useState("");
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "Todo",
  });
  const [editTask, setEditTask] = useState(null);

  const fetchProjectName = async () => {
    try {
      const res = await api.get("/projects");
      const found = res.data.find((p) => p._id === projectId);
      if (!found) {
        toast.info("Project was deleted or not found.");
        navigate("/dashboard");
        return;
      }
      setProjectName(found.name);
    } catch {
      toast.error("Failed to fetch project info.");
      navigate("/dashboard");
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks/${projectId}`);
      setTasks(res.data);
    } catch {
      toast.error("❌ Failed to load tasks.");
    }
  };

  useEffect(() => {
    fetchProjectName();
    fetchTasks();
  }, [projectId]);

  const handleCreateTask = async () => {
    const { title, description, status } = newTask;
    if (!title.trim()) return;
    try {
      const res = await api.post("/tasks", { title, description, status, projectId });
      setTasks([...tasks, res.data]);
      setNewTask({ title: "", description: "", status: "Todo" });
      toast.success("✅ Task added!");
    } catch {
      toast.error("Failed to create task");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      toast.success("🗑️ Task removed");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleEditSave = async () => {
    try {
      const res = await api.put(`/tasks/${editTask._id}`, editTask);
      setTasks((prev) =>
        prev.map((t) => (t._id === res.data._id ? res.data : t))
      );
      setEditTask(null);
      toast.success("✅ Task updated!");
    } catch {
      toast.error("❌ Failed to update");
    }
  };

  const handleStatusChange = async (task, newStatus) => {
    try {
      const res = await api.put(`/tasks/${task._id}`, {
        ...task,
        status: newStatus,
      });
      setTasks((prev) =>
        prev.map((t) => (t._id === res.data._id ? res.data : t))
      );
    } catch {
      toast.error("❌ Failed to change status");
    }
  };

  const grouped = useMemo(() => {
    return {
      Todo: tasks.filter((t) => t.status === "Todo"),
      "In Progress": tasks.filter((t) => t.status === "In Progress"),
      Done: tasks.filter((t) => t.status === "Done"),
    };
  }, [tasks]);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-[#4b3a7d] via-[#614284] to-[#805c9b] text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-wide drop-shadow-md">
          {projectName}
        </h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="text-sm bg-white/20 text-white px-4 py-2 rounded-full hover:bg-white/30 transition"
        >
          <FaArrowLeft className="inline-block mr-1" /> Back
        </button>
      </div>

      <div className="backdrop-blur-md bg-white/10 border border-white/10 p-4 rounded-2xl shadow-lg mb-8 flex flex-wrap items-center gap-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="pl-9 pr-3 py-2 rounded-xl bg-white/10 placeholder-white/60 text-white w-44 border border-white/30 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all"
          />
          <FaStickyNote className="absolute top-2.5 left-2 text-white/60" />
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            className="pl-9 pr-3 py-2 rounded-xl bg-white/10 placeholder-white/60 text-white w-56 border border-white/30 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all"
          />
          <FaAlignLeft className="absolute top-2.5 left-2 text-white/60" />
        </div>

        <select
          value={newTask.status}
          onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
          className="bg-white/10  px-4 py-2 rounded-xl border border-white/30 backdrop-blur-md  focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all"
        >
          <option value="Todo bg-white/30  "> Todo</option>
          <option value="In Progress"> In Progress</option>
          <option value="Done">Done</option>
        </select>

        <button
          onClick={handleCreateTask}
          className="bg-gradient-to-br from-[#4b3a7d] via-[#614284] to-[#59168b] hover:brightness-110 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300 shadow-md hover:shadow-xl"
        >
          <FaPlus /> Add
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(grouped).map(([key, tasks]) => (
          <div
            key={key}
            className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg p-5 space-y-4 transition-all duration-300 hover:scale-[1.01]"
          >
            <h2 className="text-xl font-bold text-white">{key}</h2>
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={() => setEditTask(task)}
                onDelete={handleDeleteTask}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        ))}
      </div>

      {editTask && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl w-96 shadow-xl transition-all scale-100 hover:scale-[1.01]">
            <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
              <FaEdit /> Edit Task
            </h2>
            <input
              type="text"
              value={editTask.title}
              onChange={(e) =>
                setEditTask({ ...editTask, title: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 border rounded-xl bg-white/20 text-white placeholder-white/60"
              placeholder="Task title"
            />
            <textarea
              value={editTask.description}
              onChange={(e) =>
                setEditTask({ ...editTask, description: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 border rounded-xl bg-white/20 text-white placeholder-white/60"
              placeholder="Task description"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditTask(null)}
                className="px-4 py-2 rounded bg-white/20 text-white hover:bg-white/30"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                className="px-4 py-2 rounded bg-green-500 hover:bg-green-600 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksPage;
